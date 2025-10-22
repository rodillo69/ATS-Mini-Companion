export default function BandModePanel({ serial, connected, currentBand, currentMode, bandwidth }) {
  const modes = ['AM', 'FM', 'SSB', 'LSB', 'USB'];
  const bands = ['MW', 'SW', 'FM', 'VHF', 'LW'];

  // Debug: log received values
  console.log('[BandModePanel] Received:', { currentBand, currentMode, bandwidth });

  const handleBandChange = (direction) => {
    if (!connected) return;
    if (direction === 'next') {
      serial?.nextBand();
    } else {
      serial?.prevBand();
    }
  };

  const handleModeChange = (direction) => {
    if (!connected) return;
    if (direction === 'next') {
      serial?.nextMode();
    } else {
      serial?.prevMode();
    }
  };

  const handleBandwidthChange = (direction) => {
    if (!connected) return;
    if (direction === 'next') {
      serial?.nextBandwidth();
    } else {
      serial?.prevBandwidth();
    }
  };

  return (
    <div className="bg-icom-panel rounded-lg p-3 sm:p-6 border border-icom-accent/30">
      <div className="grid grid-cols-3 gap-2 sm:gap-6">
        {/* Band Selection */}
        <div>
          <div className="text-center mb-1.5 sm:mb-3">
            <h3 className="text-xs sm:text-lg font-digital text-icom-accent">BAND</h3>
          </div>
          <div className="space-y-1.5 sm:space-y-3">
            <button
              onClick={() => handleBandChange('next')}
              disabled={!connected}
              className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-xs sm:text-base"
            >
              ▲ NEXT
            </button>

            <div className="bg-icom-display rounded-lg p-2 sm:p-4 border-2 border-icom-accent shadow-display">
              <div className="text-center text-xl sm:text-3xl font-digital text-icom-green digital-display">
                {currentBand || '---'}
              </div>
            </div>

            <button
              onClick={() => handleBandChange('prev')}
              disabled={!connected}
              className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-xs sm:text-base"
            >
              ▼ PREV
            </button>
          </div>
        </div>

        {/* Mode Selection */}
        <div>
          <div className="text-center mb-1.5 sm:mb-3">
            <h3 className="text-xs sm:text-lg font-digital text-icom-accent">MODE</h3>
          </div>
          <div className="space-y-1.5 sm:space-y-3">
            <button
              onClick={() => handleModeChange('next')}
              disabled={!connected}
              className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-xs sm:text-base"
            >
              ▲ NEXT
            </button>

            <div className="bg-icom-display rounded-lg p-2 sm:p-4 border-2 border-icom-accent shadow-display">
              <div className="text-center text-xl sm:text-3xl font-digital text-icom-green digital-display">
                {currentMode || '---'}
              </div>
            </div>

            <button
              onClick={() => handleModeChange('prev')}
              disabled={!connected}
              className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-xs sm:text-base"
            >
              ▼ PREV
            </button>
          </div>
        </div>

        {/* Bandwidth Selection */}
        <div>
          <div className="text-center mb-1.5 sm:mb-3">
            <h3 className="text-xs sm:text-lg font-digital text-icom-accent">BW</h3>
          </div>
          <div className="space-y-1.5 sm:space-y-3">
            <button
              onClick={() => handleBandwidthChange('next')}
              disabled={!connected}
              className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-xs sm:text-base"
            >
              ▲ WIDE
            </button>

            <div className="bg-icom-display rounded-lg p-2 sm:p-4 border-2 border-icom-accent shadow-display">
              <div className="text-center text-xl sm:text-3xl font-digital text-icom-amber digital-display">
                {bandwidth || '---'}
              </div>
            </div>

            <button
              onClick={() => handleBandwidthChange('prev')}
              disabled={!connected}
              className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-xs sm:text-base"
            >
              ▼ NARROW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
