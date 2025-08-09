import "../blocks/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm.jsx";

const IsRegisteredModal = ({ isOpen, onClose, handleSignIn }) => {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      name="registered"
      onClose={onClose}
      isOpen={isOpen}
      buttonText=""
      onSubmit={handleSignIn}
      buttonClass="modal__button-save_none"
    >
      <button
        type="button"
        className="modal__button_registered-log-in"
        onClick={() => {
          handleSignIn();
        }}
      >
        Sign in
      </button>
    </ModalWithForm>
  );
};

export default IsRegisteredModal;
