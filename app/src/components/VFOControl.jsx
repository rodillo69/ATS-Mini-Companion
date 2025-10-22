export default function VFOControl({ serial, connected, frequency, currentBand, currentMode, bandwidth }) {

  const handleStep = (dir) => {
    if (!connected) return;
    dir === 'up' ? serial?.rotateUp() : serial?.rotateDown();
  };

  const handleBand = (dir) => {
    if (!connected) return;
    dir === 'next' ? serial?.nextBand() : serial?.prevBand();
  };

  const handleMode = (dir) => {
    if (!connected) return;
    dir === 'next' ? serial?.nextMode() : serial?.prevMode();
  };

  const handleBandwidth = (dir) => {
    if (!connected) return;
    dir === 'next' ? serial?.nextBandwidth() : serial?.prevBandwidth();
  };

  const handleMenu = () => {
    if (!connected) return;
    serial?.encoderPress();
  };

  return (
    <div className="bg-icom-panel rounded-lg p-3 sm:p-6 border border-icom-accent/30">
      <div className="text-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-xl font-digital text-icom-accent">FREQUENCY CONTROL</h3>
      </div>

      {/* Horizontal layout: Arrow Down - MENU - Arrow Up */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-3">
        <button
          onClick={() => handleStep('down')}
          disabled={!connected}
          className="flex-1 max-w-xs h-20 sm:h-24 rounded-lg bg-gradient-to-br from-icom-accent/20 to-icom-accent-dim/20 border-2 border-icom-accent hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom flex items-center justify-center text-4xl sm:text-5xl text-icom-accent font-bold"
        >
          −
        </button>

        <button
          onClick={handleMenu}
          disabled={!connected}
          className="flex-1 max-w-xs h-20 sm:h-24 rounded-lg bg-gradient-to-r from-icom-amber/20 to-orange-600/20 border-2 border-icom-amber text-icom-amber hover:from-icom-amber/30 hover:to-orange-600/30 active:from-icom-amber/40 active:to-orange-600/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-sm sm:text-base font-bold flex flex-col items-center justify-center gap-1"
        >
          <span className="text-2xl">⚙️</span>
          <span>MENU</span>
        </button>

        <button
          onClick={() => handleStep('up')}
          disabled={!connected}
          className="flex-1 max-w-xs h-20 sm:h-24 rounded-lg bg-gradient-to-br from-icom-accent/20 to-icom-accent-dim/20 border-2 border-icom-accent hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom flex items-center justify-center text-4xl sm:text-5xl text-icom-accent font-bold"
        >
          +
        </button>
      </div>

      <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2">
        <div className="bg-icom-display/50 rounded-lg p-2 border border-icom-accent/20">
          <div className="text-[10px] text-icom-text-dim text-center mb-1 font-digital">BAND</div>
          <div className="flex flex-col gap-1">
            <button onClick={() => handleBand('next')} disabled={!connected} className="w-full py-1 rounded bg-icom-accent/20 border border-icom-accent/40 text-icom-accent hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 text-xs font-digital">▲</button>
            <div className="text-center text-lg sm:text-xl font-digital text-icom-green py-1">{currentBand || '---'}</div>
            <button onClick={() => handleBand('prev')} disabled={!connected} className="w-full py-1 rounded bg-icom-accent/20 border border-icom-accent/40 text-icom-accent hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 text-xs font-digital">▼</button>
          </div>
        </div>

        <div className="bg-icom-display/50 rounded-lg p-2 border border-icom-accent/20">
          <div className="text-[10px] text-icom-text-dim text-center mb-1 font-digital">MODE</div>
          <div className="flex flex-col gap-1">
            <button onClick={() => handleMode('next')} disabled={!connected} className="w-full py-1 rounded bg-icom-accent/20 border border-icom-accent/40 text-icom-accent hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 text-xs font-digital">▲</button>
            <div className="text-center text-lg sm:text-xl font-digital text-icom-green py-1">{currentMode || '---'}</div>
            <button onClick={() => handleMode('prev')} disabled={!connected} className="w-full py-1 rounded bg-icom-accent/20 border border-icom-accent/40 text-icom-accent hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 text-xs font-digital">▼</button>
          </div>
        </div>

        <div className="bg-icom-display/50 rounded-lg p-2 border border-icom-accent/20">
          <div className="text-[10px] text-icom-text-dim text-center mb-1 font-digital">BW</div>
          <div className="flex flex-col gap-1">
            <button onClick={() => handleBandwidth('next')} disabled={!connected} className="w-full py-1 rounded bg-icom-accent/20 border border-icom-accent/40 text-icom-accent hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 text-xs font-digital">▲</button>
            <div className="text-center text-lg sm:text-xl font-digital text-icom-amber py-1">{bandwidth || '---'}</div>
            <button onClick={() => handleBandwidth('prev')} disabled={!connected} className="w-full py-1 rounded bg-icom-accent/20 border border-icom-accent/40 text-icom-accent hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 text-xs font-digital">▼</button>
          </div>
        </div>
      </div>
    </div>
  );
}
