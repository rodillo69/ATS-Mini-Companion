#ifndef BLE_H
#define BLE_H

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <semaphore>

#define NORDIC_UART_SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define NORDIC_UART_CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define NORDIC_UART_CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

class NordicUART : public BLEServerCallbacks, public BLECharacteristicCallbacks {
private:
  // BLE components
  BLEServer* pServer;
  BLEService* pService;
  BLECharacteristic* pTxCharacteristic;
  BLECharacteristic* pRxCharacteristic;

  // Connection management
  bool started;

  // Data handling
  std::binary_semaphore dataConsumed{1};
  String incomingPacket;
  size_t unreadByteCount = 0;

  // Device attributes
  const char *deviceName;

public:
  NordicUART(const char *name) : deviceName(name) {
    started = false;
    pServer = nullptr;
    pService = nullptr;
    pTxCharacteristic = nullptr;
    pRxCharacteristic = nullptr;
  }

  void start()
  {
    // Don't re-initialize if already started
    if (started) return;

    try {
      BLEDevice::init(deviceName);
      BLEDevice::setPower(ESP_PWR_LVL_N0); // N12, N9, N6, N3, N0, P3, P6, P9
      BLEDevice::getAdvertising()->setName(deviceName);

      pServer = BLEDevice::getServer();
      if (pServer == nullptr)
        pServer = BLEDevice::createServer();

      pServer->setCallbacks(this); // onConnect/onDisconnect
      pServer->getAdvertising()->addServiceUUID(NORDIC_UART_SERVICE_UUID);
      pService = pServer->createService(NORDIC_UART_SERVICE_UUID);
      pTxCharacteristic = pService->createCharacteristic(NORDIC_UART_CHARACTERISTIC_UUID_TX, BLECharacteristic::PROPERTY_NOTIFY);
      pTxCharacteristic->setCallbacks(this); // onSubscribe
      pRxCharacteristic = pService->createCharacteristic(NORDIC_UART_CHARACTERISTIC_UUID_RX, BLECharacteristic::PROPERTY_WRITE);
      pRxCharacteristic->setCallbacks(this); // onWrite
      pService->start();
      pServer->getAdvertising()->start();
      started = true;
    } catch (...) {
      // If BLE init fails, mark as not started
      started = false;
    }
  }

  void stop()
  {
    if (!started) return;

    try {
      pServer = BLEDevice::getServer();
      if (pServer && pServer->getAdvertising())
      {
        pServer->getAdvertising()->stop();
      }

      if (pService)
      {
        if (pService->getServer()) pService->stop();

        if (pRxCharacteristic)
        {
          pService->removeCharacteristic(pRxCharacteristic, true);
          pRxCharacteristic = nullptr;
        }

        if (pTxCharacteristic)
        {
          pService->removeCharacteristic(pTxCharacteristic, true);
          pTxCharacteristic = nullptr;
        }

        if (pServer)
        {
          pServer->removeService(pService);
        }
        pService = nullptr;
      }

      BLEDevice::deinit(false);
    } catch (...) {
      // Ignore errors during cleanup
    }

    started = false;
  }

  bool isStarted()
  {
    return started;
  }

  void onConnect(BLEServer *pServer) {
  }

  void onDisconnect(BLEServer *pServer) {
    dataConsumed.release();
    pServer->getAdvertising()->start();
  }

  // FIXME https://github.com/espressif/arduino-esp32/issues/11805
  void onWrite(BLECharacteristic *pCharacteristic, ble_gap_conn_desc *desc)
  {
    if(pCharacteristic == pRxCharacteristic)
    {
      // Wait for previous data to get consumed
      dataConsumed.acquire();

      // Hold data until next read
      incomingPacket = pCharacteristic->getValue();
      unreadByteCount = incomingPacket.length();
    }
  }

  int available()
  {
    return unreadByteCount;
  }

  int read()
  {
    if (unreadByteCount > 0)
    {
      size_t index = incomingPacket.length() - unreadByteCount;
      int result = incomingPacket[index];
      unreadByteCount--;
      if (unreadByteCount == 0)
        dataConsumed.release();
      return result;
    }
    return -1;
  }

  size_t write(uint8_t *data, size_t size)
  {
   if (pTxCharacteristic)
   {
     pTxCharacteristic->setValue(data, size);
     pTxCharacteristic->notify();
     return size;
   }
   else
      return 0;
  }

  size_t write(uint8_t byte)
  {
    return write(&byte, 1);
  };
};

#endif
