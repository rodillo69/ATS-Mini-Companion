#include "driver/rtc_io.h"
#include "Common.h"
#include "Themes.h"
#include "Button.h"
#include "Utils.h"
#include "Menu.h"
#include "Draw.h"

// SSB patch for whole SSBRX initialization string
#include "patch_init.h"

extern ButtonTracker pb1;

// Current sleep status, returned by sleepOn()
static bool sleep_on = false;

// Current SSB patch status
static bool ssbLoaded = false;

// Time
static bool clockHasBeenSet = false;
static uint32_t clockTimer  = 0;
static uint8_t clockSeconds = 0;
static uint8_t clockMinutes = 0;
static uint8_t clockHours   = 0;
static char    clockText[8] = {0};

//
// Get firmware version and build time, as a string
//
const char *getVersion(bool shorter)
{
  static char versionString[35] = "\0";

  sprintf(versionString, "%s%sF/W: v%1.1d.%2.2d %s",
    shorter ? "" : RECEIVER_NAME,
    shorter ? "" : " ",
    VER_APP / 100,
    VER_APP % 100,
    __DATE__
  );

  return(versionString);
}

//
// Get MAC address
//
const char *getMACAddress()
{
  static char macString[20] = "\0";

  if(!macString[0])
  {
    uint64_t mac = ESP.getEfuseMac();
    sprintf(
      macString,
      "%02X:%02X:%02X:%02X:%02X:%02X",
      (uint8_t)mac,
      (uint8_t)(mac >> 8),
      (uint8_t)(mac >> 16),
      (uint8_t)(mac >> 24),
      (uint8_t)(mac >> 32),
      (uint8_t)(mac >> 40)
    );
  }
  return(macString);
}

//
// Load SSB patch into SI4735
//
void loadSSB(uint8_t bandwidth, bool draw)
{
  if(!ssbLoaded)
  {
    if(draw) drawMessage("Loading SSB");
    rx.loadPatch(ssb_patch_content, sizeof(ssb_patch_content), bandwidth);
    ssbLoaded = true;
  }
}

void unloadSSB()
{
  // Just mark SSB patch as unloaded
  ssbLoaded = false;
}

//
// Mute sound on (x=1) or off (x=0), or get current status (x=2)
// Do not call this too often because a short PIN_AMP_EN impulse can trigger amplifier mode D,
// see the NS4160 datasheet https://esp32-si4732.github.io/ats-mini/hardware.html#datasheets
//
bool muteOn(uint8_t mode, int x)
{
  // Current mute status
  static bool muted = false;

  // Current squelch status
  static bool squelched = false;

  // Effective mute status
  static bool status = false;

  bool unmute = false;
  bool mute = false;

  if(x==1) {
    status = true;
    switch(mode) {
    case MUTE_FORCE:
      mute = true;
      break;
    case MUTE_MAIN:
      if(!muted && !squelched) {
        mute = true;
      }
      muted = true;
      break;
    case MUTE_SQUELCH:
      if(!muted && !squelched) {
        mute = true;
      }
      squelched = true;
      break;
    case MUTE_TEMP:
      if(!muted && !squelched) {
        mute = true;
      }
      break;
    }
  } else if(x==0) {
    status = false;
    switch(mode) {
    case MUTE_FORCE:
      unmute = true;
      break;
    case MUTE_MAIN:
      if(muted && !squelched) {
        unmute = true;
      }
      muted = false;
      break;
    case MUTE_SQUELCH:
      if(!muted && squelched) {
        unmute = true;
      }
      squelched = false;
      break;
    case MUTE_TEMP:
      if(!muted && !squelched) {
        unmute = true;
      }
      break;
    }
  }

  if(mute) {
    // Disable audio amplifier to silence speaker
    digitalWrite(PIN_AMP_EN, LOW);
    // Activate the mute circuit
    digitalWrite(AUDIO_MUTE, HIGH);
    delay(50);
    rx.setAudioMute(true);
  }

  if(unmute) {
    // Deactivate the mute circuit
    digitalWrite(AUDIO_MUTE, LOW);
    delay(50);
    rx.setAudioMute(false);
    // Enable audio amplifier to restore speaker output
    digitalWrite(PIN_AMP_EN, HIGH);
  }

  switch(mode) {
  case MUTE_MAIN:
    return muted;
  case MUTE_SQUELCH:
    return squelched;
  case MUTE_FORCE:
  case MUTE_TEMP:
  default:
    return status;
  }
}

//
// Turn sleep on (1) or off (0), or get current status (2)
//
bool sleepOn(int x)
{
  if((x==1) && !sleep_on)
  {
    sleep_on = true;
    ledcWrite(PIN_LCD_BL, 0);
    spr.fillSprite(TFT_BLACK);
    spr.pushSprite(0, 0);
    tft.writecommand(ST7789_DISPOFF);
    tft.writecommand(ST7789_SLPIN);

    // Wait till the button is released to prevent immediate wakeup
    while(pb1.update(digitalRead(ENCODER_PUSH_BUTTON) == LOW).isPressed)
      delay(100);

    if(sleepModeIdx == SLEEP_LIGHT)
    {
      // Disable WiFi
      netStop();

      // Unmute squelch
      if(muteOn(MUTE_SQUELCH) && !muteOn(MUTE_MAIN)) muteOn(MUTE_FORCE, false);

      while(true)
      {
        esp_sleep_enable_ext0_wakeup((gpio_num_t)ENCODER_PUSH_BUTTON, LOW);
        rtc_gpio_pullup_en((gpio_num_t)ENCODER_PUSH_BUTTON);
        rtc_gpio_pulldown_dis((gpio_num_t)ENCODER_PUSH_BUTTON);
        esp_light_sleep_start();

        // Waking up here
        if(currentSleep) break; // Short click is enough to exit from sleep if timeout is enabled

        // Wait for a long press, otherwise enter the sleep again
        pb1.reset(); // Reset the button state (its timers could be stale due to CPU sleep)

        bool wasLongPressed = false;
        while(true)
        {
          ButtonTracker::State pb1st = pb1.update(digitalRead(ENCODER_PUSH_BUTTON) == LOW, 0);
          wasLongPressed |= pb1st.isLongPressed;
          if(wasLongPressed || !pb1st.isPressed) break;
          delay(100);
        }

        if(wasLongPressed) break;
      }
      // Reenable the pin as well as the display
      rtc_gpio_pullup_dis((gpio_num_t)ENCODER_PUSH_BUTTON);
      rtc_gpio_pulldown_dis((gpio_num_t)ENCODER_PUSH_BUTTON);
      rtc_gpio_deinit((gpio_num_t)ENCODER_PUSH_BUTTON);
      pinMode(ENCODER_PUSH_BUTTON, INPUT_PULLUP);
      if(muteOn(MUTE_SQUELCH) && !muteOn(MUTE_MAIN)) muteOn(MUTE_FORCE, true);
      sleepOn(false);
      // Enable WiFi
      netInit(wifiModeIdx, false);
    }
  }
  else if((x==0) && sleep_on)
  {
    sleep_on = false;
    tft.writecommand(ST7789_SLPOUT);
    delay(120);
    tft.writecommand(ST7789_DISPON);
    drawScreen();
    ledcWrite(PIN_LCD_BL, currentBrt);
    // Wait till the button is released to prevent the main loop clicks
    pb1.reset(); // Reset the button state (its timers could be stale due to CPU sleep)
    while(pb1.update(digitalRead(ENCODER_PUSH_BUTTON) == LOW, 0).isPressed)
      delay(100);
  }

  return(sleep_on);
}

//
// Set and count time
//

bool clockAvailable()
{
  return(clockHasBeenSet);
}

const char *clockGet()
{
  if(switchThemeEditor())
    return("00:00");
  else
    return(clockHasBeenSet? clockText : NULL);
}

bool clockGetHM(uint8_t *hours, uint8_t *minutes)
{
  if(!clockHasBeenSet) return(false);
  else
  {
    *hours   = clockHours;
    *minutes = clockMinutes;
    return(true);
  }
}

void clockReset()
{
  clockHasBeenSet = false;
  clockText[0] = '\0';
  clockTimer = 0;
  clockHours = clockMinutes = clockSeconds = 0;
}

static void formatClock(uint8_t hours, uint8_t minutes)
{
  int t = (int)hours * 60 + minutes + getCurrentUTCOffset() * 15;
  t = t < 0? t + 24*60 : t;
  sprintf(clockText, "%02d:%02d", (t / 60) % 24, t % 60);
}

void clockRefreshTime()
{
  if(clockHasBeenSet) formatClock(clockHours, clockMinutes);
}

bool clockSet(uint8_t hours, uint8_t minutes, uint8_t seconds)
{
  // Verify input before setting clock
  if(!clockHasBeenSet && hours < 24 && minutes < 60 && seconds < 60)
  {
    clockHasBeenSet = true;
    clockTimer   = micros();
    clockHours   = hours;
    clockMinutes = minutes;
    clockSeconds = seconds;
    clockRefreshTime();
    identifyFrequency(currentFrequency + currentBFO / 1000);
    return(true);
  }

  // Failed
  return(false);
}

bool clockTickTime()
{
  // Need to set the clock first, then accumulate one second of time
  if(clockHasBeenSet && (micros() - clockTimer >= 1000000))
  {
    uint32_t delta;

    delta = (micros() - clockTimer) / 1000000;
    clockTimer += delta * 1000000;
    clockSeconds += delta;

    if(clockSeconds>=60)
    {
      delta = clockSeconds / 60;
      clockSeconds -= delta * 60;
      clockMinutes += delta;

      if(clockMinutes>=60)
      {
        delta = clockMinutes / 60;
        clockMinutes -= delta * 60;
        clockHours = (clockHours + delta) % 24;
      }

      // Format clock for display and ask for screen update
      clockRefreshTime();
      return(true);
    }
  }

  // No screen update
  return(false);
}

//
// Check if given frequency belongs to given band
//
bool isFreqInBand(const Band *band, uint16_t freq)
{
  return((freq>=band->minimumFreq) && (freq<=band->maximumFreq));
}

//
// Convert a frequency from Hz to mode-specific units
// (TODO: use Hz across the whole codebase)
//
uint16_t freqFromHz(uint32_t freq, uint8_t mode)
{
  return(mode == FM ? freq / 10000 : freq / 1000);
}

//
// Convert a frequency from mode-specific units to Hz
//
uint32_t freqToHz(uint16_t freq, uint8_t mode)
{
  return(mode == FM ? freq * 10000 : freq * 1000);
}

//
// Extract BFO from a frequency in Hz
//
uint16_t bfoFromHz(uint32_t freq)
{
  return(freq % 1000);
}

//
// Check if given memory entry belongs to given band
//
bool isMemoryInBand(const Band *band, const Memory *memory)
{
  uint16_t freq = freqFromHz(memory->freq, memory->mode);
  if(freq<band->minimumFreq) return(false);
  if(freq>band->maximumFreq) return(false);
  if(freq==band->maximumFreq && bfoFromHz(memory->freq)) return(false);
  if(memory->mode==FM && band->bandMode!=FM) return(false);
  if(memory->mode!=FM && band->bandMode==FM) return(false);
  return(true);
}

//
// Get S-level signal strength from RSSI value
//
int getStrength(int rssi)
{
  if(switchThemeEditor()) return(17);

  if(currentMode!=FM)
  {
    // dBuV to S point conversion HF
    if (rssi <=  1) return  1; // S0
    if (rssi <=  2) return  2; // S1
    if (rssi <=  3) return  3; // S2
    if (rssi <=  4) return  4; // S3
    if (rssi <= 10) return  5; // S4
    if (rssi <= 16) return  6; // S5
    if (rssi <= 22) return  7; // S6
    if (rssi <= 28) return  8; // S7
    if (rssi <= 34) return  9; // S8
    if (rssi <= 44) return 10; // S9
    if (rssi <= 54) return 11; // S9 +10
    if (rssi <= 64) return 12; // S9 +20
    if (rssi <= 74) return 13; // S9 +30
    if (rssi <= 84) return 14; // S9 +40
    if (rssi <= 94) return 15; // S9 +50
    if (rssi <= 95) return 16; // S9 +60
    return                 17; //>S9 +60
  }
  else
  {
    // dBuV to S point conversion FM
    if (rssi <=  1) return  1; // S0
    if (rssi <=  2) return  7; // S6
    if (rssi <=  8) return  8; // S7
    if (rssi <= 14) return  9; // S8
    if (rssi <= 24) return 10; // S9
    if (rssi <= 34) return 11; // S9 +10
    if (rssi <= 44) return 12; // S9 +20
    if (rssi <= 54) return 13; // S9 +30
    if (rssi <= 64) return 14; // S9 +40
    if (rssi <= 74) return 15; // S9 +50
    if (rssi <= 76) return 16; // S9 +60
    return                 17; //>S9 +60
  }
}
