import { useState, useEffect } from 'react';

export default function MemoryPanel({ serial, connected, currentMemory, frequency, band, mode }) {
  const [showMemoryList, setShowMemoryList] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(1);
  const [saveData, setSaveData] = useState({
    band: 'FM',
    frequency: '107900000',
    mode: 'FM'
  });

  // Update save data when current frequency/band/mode changes
  useEffect(() => {
    if (frequency && band && mode) {
      setSaveData({
        band: band,
        frequency: String(Math.round(frequency)), // Convert Hz to string
        mode: mode
      });
    }
  }, [frequency, band, mode]);

  const handleShowMemory = () => {
    if (!connected) return;
    serial?.showMemorySlots();
    setShowMemoryList(!showMemoryList);
  };

  const handleSaveToMemory = () => {
    if (!connected) return;

    // Ensure frequency is a valid number string
    const freq = String(parseInt(saveData.frequency) || 0);

    console.log('[MemoryPanel] Saving to slot:', {
      slot: selectedSlot,
      band: saveData.band,
      frequency: freq,
      mode: saveData.mode
    });

    serial?.setMemorySlot(
      selectedSlot,
      saveData.band,
      freq,
      saveData.mode
    );
  };

  const handleClearSlot = () => {
    if (!connected) return;
    // Set frequency to 0 to clear the slot
    serial?.setMemorySlot(
      selectedSlot,
      saveData.band,
      '0',
      saveData.mode
    );
  };

  const handleLoadCurrentState = () => {
    if (frequency && band && mode) {
      setSaveData({
        band: band,
        frequency: String(Math.round(frequency)),
        mode: mode
      });
    }
  };

  return (
    <div className="bg-icom-panel rounded-lg p-3 sm:p-4 border border-icom-accent/30">
      <div className="text-center mb-3">
        <h3 className="text-base sm:text-xl font-digital text-icom-accent">MEMORY MANAGEMENT</h3>
      </div>

      {/* Info Message */}
      <div className="bg-icom-display/30 border border-icom-accent/20 rounded-lg p-3 mb-3 text-xs text-icom-text">
        <p className="font-digital mb-2">📝 Memory Commands:</p>
        <ul className="list-disc ml-5 space-y-1 text-[10px]">
          <li><strong>SAVE:</strong> Stores frequency, band, and mode to selected slot</li>
          <li><strong>CLEAR:</strong> Sets frequency to 0 to erase the slot</li>
          <li><strong>SHOW:</strong> Displays all memory slots in Debug Console (use '$' command)</li>
          <li><strong>LOAD FROM CURRENT:</strong> Captures current radio state</li>
        </ul>
      </div>

      {/* Memory Grid and Save Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Memory Selector */}
        <div className="bg-icom-display/50 rounded-lg p-3 border border-icom-accent/20">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs sm:text-sm font-digital text-icom-accent">SELECT SLOT</h4>
            <button
              onClick={handleShowMemory}
              disabled={!connected}
              className="px-3 py-1 rounded bg-icom-accent/20 border border-icom-accent/40 text-icom-accent hover:bg-icom-accent/30 active:bg-icom-accent/40 disabled:opacity-30 font-digital text-xs"
            >
              {showMemoryList ? '▼ HIDE' : '▶ SHOW'}
            </button>
          </div>

          {showMemoryList ? (
            <div className="max-h-48 overflow-y-auto">
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 100 }, (_, i) => i + 1).map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`aspect-square rounded border font-digital text-[9px] transition-all ${
                      selectedSlot === slot
                        ? 'bg-icom-accent text-icom-bg border-icom-accent shadow-icom'
                        : 'bg-icom-panel border-icom-accent/30 text-icom-text-dim hover:border-icom-accent hover:text-icom-accent active:bg-icom-accent/20'
                    }`}
                  >
                    {String(slot).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl font-digital text-icom-accent mb-2">
                {String(selectedSlot).padStart(2, '0')}
              </div>
              <div className="text-xs text-icom-text-dim font-digital">Selected Slot</div>
            </div>
          )}
        </div>

        {/* Save Configuration */}
        <div className="bg-icom-display/50 rounded-lg p-3 border border-icom-accent/20">
          <h4 className="text-xs sm:text-sm font-digital text-icom-accent mb-2">SAVE CONFIGURATION</h4>

          <div className="space-y-2">
            {/* Slot Number */}
            <div>
              <label className="block text-[9px] text-icom-text-dim mb-0.5 font-digital">SLOT</label>
              <input
                type="number"
                min="1"
                max="100"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full bg-icom-bg border border-icom-accent/30 rounded px-2 py-1 text-sm text-icom-accent font-digital focus:border-icom-accent focus:outline-none"
              />
            </div>

            {/* Band and Mode on same row */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] text-icom-text-dim mb-0.5 font-digital">BAND</label>
                <select
                  value={saveData.band}
                  onChange={(e) => setSaveData({ ...saveData, band: e.target.value })}
                  className="w-full bg-icom-bg border border-icom-accent/30 rounded px-2 py-1 text-sm text-icom-accent font-digital focus:border-icom-accent focus:outline-none"
                >
                  <option value="LW">LW</option>
                  <option value="MW">MW</option>
                  <option value="SW">SW</option>
                  <option value="FM">FM</option>
                  <option value="VHF">VHF</option>
                  <option value="49M">49M</option>
                  <option value="41M">41M</option>
                  <option value="31M">31M</option>
                  <option value="25M">25M</option>
                  <option value="22M">22M</option>
                  <option value="19M">19M</option>
                  <option value="16M">16M</option>
                  <option value="15M">15M</option>
                  <option value="13M">13M</option>
                  <option value="11M">11M</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] text-icom-text-dim mb-0.5 font-digital">MODE</label>
                <select
                  value={saveData.mode}
                  onChange={(e) => setSaveData({ ...saveData, mode: e.target.value })}
                  className="w-full bg-icom-bg border border-icom-accent/30 rounded px-2 py-1 text-sm text-icom-accent font-digital focus:border-icom-accent focus:outline-none"
                >
                  <option value="AM">AM</option>
                  <option value="FM">FM</option>
                  <option value="LSB">LSB</option>
                  <option value="USB">USB</option>
                </select>
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-[9px] text-icom-text-dim mb-0.5 font-digital">FREQUENCY (Hz)</label>
              <input
                type="text"
                value={saveData.frequency}
                onChange={(e) => setSaveData({ ...saveData, frequency: e.target.value.replace(/[^0-9]/g, '') })}
                placeholder="107900000"
                className="w-full bg-icom-bg border border-icom-accent/30 rounded px-2 py-1 text-sm text-icom-accent font-digital focus:border-icom-accent focus:outline-none"
              />
              <div className="text-[9px] text-icom-text-dim mt-0.5">
                {((parseInt(saveData.frequency) || 0) / 1000000).toFixed(3)} MHz
              </div>
            </div>

            {/* Load Current State Button */}
            <button
              onClick={handleLoadCurrentState}
              disabled={!connected}
              className="w-full py-1.5 rounded bg-icom-accent/10 border border-icom-accent/40 text-icom-accent hover:bg-icom-accent/20 active:bg-icom-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-digital text-xs"
            >
              📡 LOAD FROM CURRENT STATE
            </button>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSaveToMemory}
                disabled={!connected}
                className="py-2 rounded-lg bg-gradient-to-r from-icom-green/80 to-icom-accent border-2 border-icom-green text-white hover:from-icom-green hover:to-icom-accent-dim active:from-icom-green/90 active:to-icom-accent/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom-strong font-digital text-xs"
              >
                💾 SAVE
              </button>

              <button
                onClick={handleClearSlot}
                disabled={!connected}
                className="py-2 rounded-lg bg-gradient-to-r from-red-600/80 to-red-800 border-2 border-red-600 text-white hover:from-red-600 hover:to-red-700 active:from-red-600/90 active:to-red-800/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-icom-strong font-digital text-xs"
              >
                🗑️ CLEAR
              </button>
            </div>

            <div className="text-[9px] text-icom-text-dim text-center mt-2 font-digital">
              Check Debug Console after "SHOW" to see all saved memories
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
