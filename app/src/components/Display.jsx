import { useState } from 'react';
import Modal from './Modal';

export default function Display({ data, connected, serial }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputFreq, setInputFreq] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', message: '' });

  const formatFrequency = (freq) => {
    if (!freq) return '000.000';

    // VHF and above: show MHz, otherwise show kHz
    if (data.band === 'VHF' || data.band === 'FM') {
      const mhz = (freq / 1000000).toFixed(3);
      return mhz.padStart(7, '0');
    } else {
      const khz = (freq / 1000).toFixed(1);
      return khz.padStart(7, '0');
    }
  };

  const getFrequencyUnit = () => {
    return (data.band === 'VHF' || data.band === 'FM') ? 'MHz' : 'kHz';
  };

  // Convert RSSI (dBµV) to S-meter percentage
  const calculateSMeterPosition = (rssi) => {
    // Exact mapping: dBµV value to bar position
    // Markers at positions: 0%, 11.11%, 22.22%, 33.33%, 44.44%, 55.56%, 66.67%, 77.78%, 88.89%, 100%
    // Represent dBµV:        0,   1,     3,      5,      7,      9,      19,     29,     49,     max

    if (rssi <= 0) return 0;
    if (rssi >= 1 && rssi < 3) return 11.11 + ((rssi - 1) / 2) * 11.11;
    if (rssi >= 3 && rssi < 5) return 22.22 + ((rssi - 3) / 2) * 11.11;
    if (rssi >= 5 && rssi < 7) return 33.33 + ((rssi - 5) / 2) * 11.11;
    if (rssi >= 7 && rssi < 9) return 44.44 + ((rssi - 7) / 2) * 11.11;
    if (rssi >= 9 && rssi < 19) return 55.56 + ((rssi - 9) / 10) * 11.11;
    if (rssi >= 19 && rssi < 29) return 66.67 + ((rssi - 19) / 10) * 11.11;
    if (rssi >= 29 && rssi < 49) return 77.78 + ((rssi - 29) / 20) * 11.11;
    if (rssi >= 49) return 88.89 + ((rssi - 49) / 78) * 11.11;

    return 0;
  };

  const handleFrequencyClick = () => {
    if (!connected) return;
    setIsEditing(true);

    if (data.band === 'VHF' || data.band === 'FM') {
      setInputFreq((data.frequency / 1000000).toFixed(3)); // MHz
    } else {
      setInputFreq((data.frequency / 1000).toFixed(1)); // kHz
    }
  };

  const handleFrequencySubmit = () => {
    if (!connected || !inputFreq) return;

    let targetFreqHz;
    if (data.band === 'VHF' || data.band === 'FM') {
      targetFreqHz = parseFloat(inputFreq) * 1000000; // Convert MHz to Hz
    } else {
      targetFreqHz = parseFloat(inputFreq) * 1000; // Convert kHz to Hz
    }

    const currentFreqHz = data.frequency;
    const diff = targetFreqHz - currentFreqHz;

    // Parse step from data (e.g., "100k" -> 100, "1k" -> 1, "10k" -> 10)
    let stepKHz = 10; // default
    if (data.step) {
      const stepMatch = data.step.toString().match(/(\d+)k?/i);
      if (stepMatch) {
        stepKHz = parseInt(stepMatch[1]);
      }
    }

    const steps = Math.round(diff / stepKHz);

    // Limit to reasonable number of steps
    if (Math.abs(steps) > 1000) {
      setModalMessage({
        title: 'Error: Too Many Steps',
        message: `Se requieren ${Math.abs(steps)} pasos para alcanzar la frecuencia. Intenta con una frecuencia más cercana o cambia el tamaño del paso.`
      });
      setModalOpen(true);
      setIsEditing(false);
      return;
    }

    // Send multiple up/down commands to reach target
    if (steps > 0) {
      for (let i = 0; i < Math.abs(steps); i++) {
        setTimeout(() => serial?.rotateUp(), i * 30);
      }
    } else if (steps < 0) {
      for (let i = 0; i < Math.abs(steps); i++) {
        setTimeout(() => serial?.rotateDown(), i * 30);
      }
    }

    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFrequencySubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-icom-display to-black rounded-lg p-3 sm:p-4 shadow-lg border border-icom-accent/30">
      {/* Status Bar */}
      <div className="flex items-center justify-between mb-2 sm:mb-3 text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <span className="text-icom-text-dim">FW: <span className="text-icom-accent font-digital">{data.firmware}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-digital ${data.voltage > 4.0 ? 'text-icom-green' : data.voltage > 3.5 ? 'text-icom-amber' : 'text-red-500'}`}>
            🔋 {data.voltage.toFixed(2)}V
          </span>
        </div>
      </div>

      {/* Main Frequency Display */}
      <div className="mb-2 sm:mb-3">
        {isEditing ? (
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <input
              type="text"
              value={inputFreq}
              onChange={(e) => setInputFreq(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className="text-4xl sm:text-6xl font-digital text-icom-accent digital-display text-center tracking-wider bg-icom-bg/50 border-2 border-icom-accent rounded-lg px-3 py-1 sm:px-4 sm:py-2 max-w-xs sm:max-w-md focus:outline-none focus:border-icom-green"
              placeholder="000.000"
            />
            <button
              onClick={handleFrequencySubmit}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-icom-green text-icom-bg rounded-lg font-digital text-sm hover:bg-icom-accent transition-all"
            >
              GO
            </button>
          </div>
        ) : (
          <div
            className={`text-4xl sm:text-6xl font-digital text-icom-accent digital-display text-center tracking-wider ${connected ? 'cursor-pointer hover:text-icom-green transition-colors' : ''}`}
            onClick={handleFrequencyClick}
            title={connected ? 'Click to enter frequency' : ''}
          >
            {formatFrequency(data.frequency)}
            <span className="text-2xl sm:text-3xl ml-1 sm:ml-2">{getFrequencyUnit()}</span>
          </div>
        )}
      </div>

      {/* Signal Meters - Professional Style */}
      <div className="space-y-2">
        {/* S-METER */}
        <div className="bg-icom-bg/50 rounded-lg p-2 sm:p-3 border border-icom-accent/20">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="text-[10px] sm:text-xs text-icom-text-dim font-digital">S-METER</div>
            <div className="text-sm sm:text-lg font-digital text-icom-accent">{data.rssi} dBµV</div>
          </div>

          {/* S-Meter Scale */}
          <div className="relative h-6 sm:h-8 bg-icom-display rounded border border-icom-accent/30">
            {/* Background gradient zones */}
            <div className="absolute inset-0 flex">
              <div className="flex-1 bg-gradient-to-r from-red-900/30 to-red-600/30"></div>
              <div className="flex-1 bg-gradient-to-r from-red-600/30 to-icom-amber/30"></div>
              <div className="flex-1 bg-gradient-to-r from-icom-amber/30 to-icom-green/30"></div>
            </div>

            {/* Scale markers */}
            <div className="absolute inset-0 flex items-center">
              {[0, 1, 3, 5, 7, 9, 19, 29, 49].map((s, i) => (
                <div key={s} className="flex-1 flex flex-col items-center justify-center border-l border-icom-accent/20 first:border-l-0">
                  <div className="text-[8px] sm:text-[10px] font-digital text-icom-text-dim">
                    {s === 0 ? '' : s > 9 ? `+${s-9}` : `${s}`}
                  </div>
                </div>
              ))}
            </div>

            {/* Active bar */}
            <div
              className="absolute top-1 bottom-1 left-1 bg-gradient-to-r from-icom-green via-icom-amber to-icom-green rounded transition-all duration-300 shadow-icom"
              style={{
                width: `${calculateSMeterPosition(data.rssi)}%`,
                opacity: 0.8
              }}
            ></div>

            {/* Needle indicator */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-icom-strong transition-all duration-200"
              style={{ left: `${calculateSMeterPosition(data.rssi)}%` }}
            ></div>
          </div>
        </div>

        {/* SNR METER */}
        <div className="bg-icom-bg/50 rounded-lg p-2 sm:p-3 border border-icom-accent/20">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="text-[10px] sm:text-xs text-icom-text-dim font-digital"><span className="hidden sm:inline">SNR (Signal/Noise Ratio)</span><span className="sm:hidden">SNR</span></div>
            <div className="text-sm sm:text-lg font-digital text-icom-accent">{data.snr} dB</div>
          </div>

          {/* SNR Meter Scale */}
          <div className="relative h-6 sm:h-8 bg-icom-display rounded border border-icom-accent/30">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-icom-amber/20 to-icom-green/20"></div>

            {/* Scale markers */}
            <div className="absolute inset-0 flex items-center">
              {[0, 10, 20, 30, 40, 50, 60, 70].map((val, i) => (
                <div key={val} className="flex-1 flex items-center justify-center border-l border-icom-accent/20 first:border-l-0">
                  <div className="text-[8px] sm:text-[10px] font-digital text-icom-text-dim">{val}</div>
                </div>
              ))}
            </div>

            {/* Active bar */}
            <div
              className="absolute top-1 bottom-1 left-1 bg-gradient-to-r from-icom-accent to-icom-green rounded transition-all duration-300 shadow-icom"
              style={{
                width: `${Math.min((data.snr / 70) * 100, 100)}%`,
                opacity: 0.7
              }}
            ></div>

            {/* Needle indicator */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-icom-strong transition-all duration-200"
              style={{ left: `${Math.min((data.snr / 70) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* AGC */}
      <div className="mt-2">
        <div className="bg-icom-bg/50 rounded-lg p-1.5 sm:p-2 text-center border border-icom-accent/20">
          <span className="text-[10px] sm:text-xs text-icom-text-dim">AGC/ATTN: </span>
          <span className="text-xs sm:text-sm font-digital text-icom-accent">{data.agc}</span>
        </div>
      </div>

      {/* Status Indicator */}
      {!connected && (
        <div className="mt-4 text-center text-red-500 font-digital animate-pulse">
          NOT CONNECTED
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalMessage.title}
        message={modalMessage.message}
      />
    </div>
  );
}
