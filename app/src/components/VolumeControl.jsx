export default function VolumeControl({ serial, connected, volume, backlight, agc }) {
  const handleVolumeChange = (direction) => {
    if (!connected) return;
    if (direction === 'up') {
      serial?.volumeUp();
    } else {
      serial?.volumeDown();
    }
  };

  const handleBacklightChange = (direction) => {
    if (!connected) return;
    if (direction === 'up') {
      serial?.backlightUp();
    } else {
      serial?.backlightDown();
    }
  };

  const handleAGCChange = (direction) => {
    if (!connected) return;
    if (direction === 'up') {
      serial?.agcUp();
    } else {
      serial?.agcDown();
    }
  };

  return (
    <div className="bg-icom-panel rounded-lg p-3 sm:p-6 border border-icom-accent/30">
      <div className="text-center mb-2 sm:mb-4">
        <h3 className="text-base sm:text-xl font-digital text-icom-accent">AUDIO & SETTINGS</h3>
      </div>

      <div className="space-y-3 sm:space-y-6">
        {/* Volume Control */}
        <div>
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-xs sm:text-sm text-icom-text-dim font-digital">VOLUME</span>
            <span className="text-sm sm:text-lg text-icom-accent font-digital">{volume}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleVolumeChange('down')}
              disabled={!connected}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom flex items-center justify-center text-xl sm:text-2xl text-icom-accent font-bold"
            >
              −
            </button>

            <div className="flex-1 bg-icom-display rounded-full h-6 sm:h-8 overflow-hidden border border-icom-accent/30 shadow-display">
              <div
                className="h-full bg-gradient-to-r from-icom-accent to-icom-green transition-all shadow-icom"
                style={{ width: `${(volume / 63) * 100}%` }}
              ></div>
            </div>

            <button
              onClick={() => handleVolumeChange('up')}
              disabled={!connected}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom flex items-center justify-center text-xl sm:text-2xl text-icom-accent font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Backlight Control */}
        <div>
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-xs sm:text-sm text-icom-text-dim font-digital">BACKLIGHT</span>
            <span className="text-sm sm:text-lg text-icom-accent font-digital">{backlight}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleBacklightChange('down')}
              disabled={!connected}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom flex items-center justify-center text-xl sm:text-2xl text-icom-accent font-bold"
            >
              −
            </button>

            <div className="flex-1 bg-icom-display rounded-full h-6 sm:h-8 overflow-hidden border border-icom-accent/30 shadow-display">
              <div
                className="h-full bg-gradient-to-r from-icom-amber to-icom-green transition-all shadow-icom"
                style={{ width: `${(backlight / 10) * 100}%` }}
              ></div>
            </div>

            <button
              onClick={() => handleBacklightChange('up')}
              disabled={!connected}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom flex items-center justify-center text-xl sm:text-2xl text-icom-accent font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* AGC Control */}
        <div>
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-xs sm:text-sm text-icom-text-dim font-digital">AGC / ATTN</span>
            <span className="text-sm sm:text-lg text-icom-accent font-digital">{agc}</span>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => handleAGCChange('down')}
              disabled={!connected}
              className="flex-1 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-xs sm:text-base"
            >
              ◄ PREV
            </button>

            <button
              onClick={() => handleAGCChange('up')}
              disabled={!connected}
              className="flex-1 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-xs sm:text-base"
            >
              NEXT ►
            </button>
          </div>
        </div>

        {/* Calibration (Fine Tune) */}
        <div>
          <div className="text-center mb-1.5 sm:mb-2">
            <span className="text-xs sm:text-sm text-icom-text-dim font-digital">CALIBRATION</span>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => serial?.calibrationDown()}
              disabled={!connected}
              className="flex-1 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-xs sm:text-base"
            >
              ◄ DOWN
            </button>

            <button
              onClick={() => serial?.calibrationUp()}
              disabled={!connected}
              className="flex-1 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-xs sm:text-base"
            >
              UP ►
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
