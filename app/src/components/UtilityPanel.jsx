export default function UtilityPanel({ serial, connected, sleep }) {
  return (
    <div className="bg-icom-panel rounded-lg p-3 sm:p-6 border border-icom-accent/30">
      <div className="text-center mb-2 sm:mb-4">
        <h3 className="text-base sm:text-xl font-digital text-icom-accent">UTILITIES</h3>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {/* Monitor Mode Toggle */}
        <button
          onClick={() => serial?.toggleMonitor()}
          disabled={!connected}
          className="w-full py-3 sm:py-4 rounded-lg bg-gradient-to-r from-icom-green/20 to-emerald-600/20 border-2 border-icom-green text-icom-green hover:from-icom-green/30 hover:to-emerald-600/30 active:from-icom-green/40 active:to-emerald-600/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-sm sm:text-lg"
        >
          📡 TOGGLE MONITOR
        </button>

        {/* Sleep Mode */}
        <button
          onClick={() => serial?.toggleSleep()}
          disabled={!connected}
          className={`w-full py-3 sm:py-4 rounded-lg border-2 font-digital text-sm sm:text-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
            sleep
              ? 'bg-gradient-to-r from-icom-amber to-orange-600 border-icom-amber text-white shadow-icom-strong btn-active'
              : 'bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 hover:shadow-icom'
          }`}
        >
          {sleep ? '💤 SLEEP MODE ON' : '⏰ SLEEP MODE'}
        </button>

        {/* Take Screenshot */}
        <button
          onClick={() => serial?.takeScreenshot()}
          disabled={!connected}
          className="w-full py-3 sm:py-4 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border-2 border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-sm sm:text-lg"
        >
          📸 SCREENSHOT
        </button>

        {/* Theme Editor */}
        <button
          onClick={() => serial?.toggleThemeEditor()}
          disabled={!connected}
          className="w-full py-3 sm:py-4 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border-2 border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-sm sm:text-lg"
        >
          🎨 THEME EDITOR
        </button>

        {/* Get Theme */}
        <button
          onClick={() => serial?.getCurrentTheme()}
          disabled={!connected}
          className="w-full py-3 sm:py-4 rounded-lg bg-gradient-to-r from-icom-accent/20 to-icom-accent-dim/20 border-2 border-icom-accent text-icom-text hover:from-icom-accent/30 hover:to-icom-accent-dim/30 active:from-icom-accent/40 active:to-icom-accent-dim/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom font-digital text-sm sm:text-lg"
        >
          🎨 GET THEME
        </button>
      </div>
    </div>
  );
}
