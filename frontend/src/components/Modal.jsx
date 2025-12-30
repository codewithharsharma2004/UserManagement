import "./Modal.css";

export default function Modal({ isOpen, onClose, title, children, confirmText = "Confirm", cancelText = "Cancel", onConfirm, showCancel = true }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          {showCancel && (
            <button className="btn btn-secondary" onClick={onClose}>
              {cancelText}
            </button>
          )}
          <button className="btn btn-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
