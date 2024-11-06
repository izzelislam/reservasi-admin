import React, { useEffect } from 'react'

const Modal = ({ visible, onClose, children, styles }: { visible: boolean, styles?: string, children: React.ReactNode, onClose?: () => void }) => {
  const modalRef = React.useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  }

  const handleESC = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleClose();
  }

  return (
    <dialog ref={modalRef} className={`modal modal-bottom sm:modal-middle ${styles}`} onCancel={handleESC}>
      <div className="modal-box">
        {children}
      </div>
    </dialog>
  )
}

export default Modal