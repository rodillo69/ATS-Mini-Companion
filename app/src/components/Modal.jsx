export default function Modal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-icom-panel rounded-lg border-2 border-icom-accent shadow-2xl max-w-md w-full animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-icom-display to-icom-bg p-4 border-b border-icom-accent/30 rounded-t-lg">
          <h3 className="text-lg font-digital text-icom-accent">{title}</h3>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-icom-text font-digital text-base leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-icom-accent/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-icom-accent/80 to-icom-accent-dim border-2 border-icom-accent text-white hover:from-icom-accent hover:to-icom-accent-dim active:from-icom-accent/90 active:to-icom-accent-dim/90 transition-all hover:shadow-icom font-digital text-sm font-bold"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
