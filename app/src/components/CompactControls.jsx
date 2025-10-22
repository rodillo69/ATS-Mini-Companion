export default function CompactControls({ serial, connected, volume, backlight, agc, sleep }) {
  const handleVolumeChange = (direction) => {
    if (!connected) return;
    if (direction === 'up') {
      serial?.volumeUp();
    } else {
      serial?.volumeDown();
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
    <div className="bg-icom-panel rounded-lg p-3 border border-icom-accent/30">
      <div className="grid grid-cols-2 gap-2">
        {/* Volume Control */}
        <div className="bg-icom-display/50 rounded-lg p-2 border border-icom-accent/20">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-icom-text-dim font-digital">VOL</span>
            <span className="text-xs text-icom-accent font-digital">{volume}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleVolumeChange('down')}
              disabled={!connected}
              className="w-8 h-8 rounded bg-icom-accent/20 border border-icom-accent/40 hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 flex items-center justify-center text-lg text-icom-accent font-bold"
            >
              −
            </button>
            <div className="flex-1 bg-icom-display rounded-full h-4 overflow-hidden border border-icom-accent/30">
              <div
                className="h-full bg-gradient-to-r from-icom-accent to-icom-green transition-all"
                style={{ width: `${(volume / 63) * 100}%` }}
              ></div>
            </div>
            <button
              onClick={() => handleVolumeChange('up')}
              disabled={!connected}
              className="w-8 h-8 rounded bg-icom-accent/20 border border-icom-accent/40 hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 flex items-center justify-center text-lg text-icom-accent font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* AGC Control */}
        <div className="bg-icom-display/50 rounded-lg p-2 border border-icom-accent/20">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-icom-text-dim font-digital">AGC</span>
            <span className="text-xs text-icom-accent font-digital">{agc}</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => handleAGCChange('down')}
              disabled={!connected}
              className="flex-1 py-1.5 rounded bg-icom-accent/20 border border-icom-accent/40 text-icom-accent hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 font-digital text-xs"
            >
              ◄
            </button>
            <button
              onClick={() => handleAGCChange('up')}
              disabled={!connected}
              className="flex-1 py-1.5 rounded bg-icom-accent/20 border border-icom-accent/40 text-icom-accent hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 font-digital text-xs"
            >
              ►
            </button>
          </div>
        </div>

        {/* Monitor Toggle */}
        <button
          onClick={() => serial?.toggleMonitor()}
          disabled={!connected}
          className="bg-icom-green/20 rounded-lg p-2 border border-icom-green/40 text-icom-green hover:bg-icom-green/30 active:bg-icom-green/40 disabled:opacity-30 font-digital text-xs"
        >
          📡 MONITOR
        </button>

        {/* Sleep Mode */}
        <button
          onClick={() => serial?.toggleSleep()}
          disabled={!connected}
          className={`rounded-lg p-2 border font-digital text-xs transition-all disabled:opacity-30 ${
            sleep
              ? 'bg-icom-amber/80 border-icom-amber text-white'
              : 'bg-icom-accent/20 border-icom-accent/40 text-icom-accent hover:bg-icom-accent/30 active:bg-icom-accent/40'
          }`}
        >
          {sleep ? '💤 SLEEP' : '⏰ SLEEP'}
        </button>
      </div>
    </div>
  );
}
