import { X } from "lucide-react";
import "../Estilos/stylesComponentes/Modal.css";

const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-base-fondo" onClick={onClose}>
      <div className="modal-base" onClick={(e) => e.stopPropagation()}>
        <div className="modal-base-header">
          <div>
            <h2 className="modal-base-titulo">{title}</h2>
            {subtitle && <p className="modal-base-subtitulo">{subtitle}</p>}
          </div>
          <button className="modal-base-cerrar" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-base-contenido">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
