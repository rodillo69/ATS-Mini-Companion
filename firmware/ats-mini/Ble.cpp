#include "Common.h"
#include "Themes.h"
#include "Menu.h"
#include "Ble.h"

NordicUART BLESerial = NordicUART(RECEIVER_NAME);

static uint32_t bleRemoteTimer = millis();
static uint8_t bleRemoteSeqnum = 0;
static bool bleRemoteLogOn = false;

//
// Get current connection status
// (-1 - not connected, 0 - disabled, 1 - connected)
//
int8_t getBleStatus()
{
  if(!BLESerial.isStarted()) return 0;
  return BLEDevice::getServer()->getConnectedCount() > 0 ? 1 : -1;
}

//
// Stop BLE hardware
//
void bleStop()
{
  if(!BLESerial.isStarted()) return;
  BLESerial.stop();
}

void bleInit(uint8_t bleMode)
{
  bleStop();

  if(bleMode == BLE_OFF) return;

  // Add small delay to ensure clean shutdown
  delay(100);

  BLESerial.start();

  // Add small delay to ensure BLE is fully initialized
  delay(100);
}

int bleDoCommand(uint8_t bleMode)
{
  if(bleMode == BLE_OFF) return 0;

  if (BLEDevice::getServer()->getConnectedCount() > 0) {
    if (BLESerial.available()) {
      char bleChar = BLESerial.read();
      BLESerial.write(bleChar);
      // Execute the remote command and return the event
      return remoteDoCommand(bleChar);
    }
  }
  return 0;
}

//
// Tick BLE remote time, periodically printing status
//
void bleTickTime()
{
  if(bleRemoteLogOn && (millis() - bleRemoteTimer >= 500))
  {
    // Mark time and increment diagnostic sequence number
    bleRemoteTimer = millis();
    bleRemoteSeqnum++;
    // Show status via BLE
    blePrintStatus();
  }
}

//
// Print current status to BLE
//
void blePrintStatus()
{
  if(!BLESerial.isStarted()) return;
  if(BLEDevice::getServer()->getConnectedCount() == 0) return;

  // Prepare information ready to be sent
  float remoteVoltage = batteryMonitor();

  // S-Meter conditional on compile option
  rx.getCurrentReceivedSignalQuality();
  uint8_t remoteRssi = rx.getCurrentRSSI();
  uint8_t remoteSnr = rx.getCurrentSNR();

  // Use rx.getFrequency to force read of capacitor value from SI4732/5
  rx.getFrequency();
  uint16_t tuningCapacitor = rx.getAntennaTuningCapacitor();

  // Format status string
  char statusBuffer[128];
  snprintf(statusBuffer, sizeof(statusBuffer),
    "%u,%u,%d,%d,%s,%s,%s,%s,%hu,%hu,%hu,%hu,%hu,%.2f,%hu\r\n",
    VER_APP,
    currentFrequency,
    currentBFO,
    ((currentMode == USB) ? getCurrentBand()->usbCal :
     (currentMode == LSB) ? getCurrentBand()->lsbCal : 0),
    getCurrentBand()->bandName,
    bandModeDesc[currentMode],
    getCurrentStep()->desc,
    getCurrentBandwidth()->desc,
    agcIdx,
    volume,
    remoteRssi,
    remoteSnr,
    tuningCapacitor,
    remoteVoltage,
    bleRemoteSeqnum
  );

  // Send via BLE
  BLESerial.write((uint8_t*)statusBuffer, strlen(statusBuffer));
}

//
// Toggle BLE remote logging
//
void bleToggleMonitor()
{
  bleRemoteLogOn = !bleRemoteLogOn;
}
