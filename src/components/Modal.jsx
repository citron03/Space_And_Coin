import './Modal.css';

const Modal = ({message}) => {

    return (
        <span className='fadeout-modal'>{message}</span>
    )
}

export default Modal;