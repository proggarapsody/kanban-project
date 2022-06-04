import React from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

const Modal = ({ active, setActive, children, className }) => {
  return createPortal(
    <div className={`${active ? 'modal active' : 'modal'}`} onClick={() => setActive(false)}>
      <div
        className={`${active ? 'modalContent active' : 'modalContent'} ${className && className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;
