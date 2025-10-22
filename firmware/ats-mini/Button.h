#ifndef BUTTON_H
#define BUTTON_H

#define DEBOUNCE_INTERVAL    50
#define SHORT_PRESS_INTERVAL 500
#define LONG_PRESS_INTERVAL  2000

class ButtonTracker {
  public:
    struct State {
      bool isPressed;       // Current pressed state (after debounce)
      bool wasClicked;      // Released after <0.5s press
      bool wasShortPressed; // Released after >0.5s press
      bool isLongPressed;   // Still pressed after >2s
    };

  ButtonTracker();
  void reset();
  State update(bool currentState, unsigned int debounceInterval = DEBOUNCE_INTERVAL);

  private:
    bool lastState; // Last raw input state
    bool lastStableState; // Last debounced state
    unsigned long lastDebounceTime;
    unsigned long pressStartTime;
};

#endif
