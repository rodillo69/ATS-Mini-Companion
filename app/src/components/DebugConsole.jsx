import { useEffect, useRef } from 'react';

export default function DebugConsole({ serial, connected, rawData }) {
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [rawData]);

  return (
    <div className="bg-icom-panel rounded-lg border border-icom-accent/30 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-icom-display to-icom-bg p-3 border-b border-icom-accent/30 flex-shrink-0">
        <h3 className="text-lg font-digital text-icom-accent flex items-center gap-2">
          🔍 DEBUG CONSOLE
          {connected && <span className="text-sm text-icom-green">(CONNECTED)</span>}
        </h3>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 overflow-y-auto" ref={logContainerRef}>
        <div className="bg-icom-display rounded border border-icom-accent/30 p-3">
          <div className="text-xs text-icom-text-dim mb-2 font-digital">RAW SERIAL DATA</div>
          <div className="space-y-1 text-xs font-mono">
            {!rawData || rawData.length === 0 ? (
              <div className="text-icom-text-dim italic p-2 text-xs">
                No data received yet. Make sure:
                <ul className="list-disc ml-4 mt-2">
                  <li>You're connected to the ATS Mini</li>
                  <li>Monitor mode is active</li>
                  <li>Check browser console (F12) for logs</li>
                </ul>
              </div>
            ) : (
              rawData.slice(-100).map((item, idx) => (
                <div key={idx} className="bg-icom-bg/50 rounded p-2 border-l-2 border-icom-green">
                  <div className="flex items-start gap-2">
                    <span className="text-icom-text-dim text-xs whitespace-nowrap">[{item.time}]</span>
                    <span className="text-icom-green break-all flex-1 text-xs">{item.data}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
