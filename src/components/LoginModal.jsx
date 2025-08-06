import { useEffect, useState } from "react";
import "../blocks/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm.jsx";

const LoginModal = ({ isOpen, onLogIn, onClose, onOpenSignUpModal }) => {
  // declare state for each input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  useEffect(() => {
    if (!isOpen) return; // stop the effect if the modal is not open

    // Reset input fields and clean up the event listener
    setEmail("");
    setPassword("");
  }, [isOpen, onClose]); // watch isOpen to add the listeners only when the modal is open

  // create onChange handlers corresponding to each state variable
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();

    const submittedData = { email, password };
    onLogIn(submittedData);
  }

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <>
      {/* don't forget to pass appropriate props to ModalWithForm */}
      <ModalWithForm
        title="Sign in"
        name="log-in"
        onClose={onClose}
        isOpen={isOpen}
        buttonText="Log In"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isFormValid}
      >
        <label htmlFor="email" className="modal__input-label">
          {" "}
          Email{" "}
        </label>
        <input
          type="email"
          id="email"
          className="modal__input"
          placeholder="Enter email"
          required
          minLength="2"
          maxLength="30"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password" className="modal__input-label">
          Pasword
        </label>
        <input
          id="password"
          className="modal__input"
          placeholder="Enter password"
          required
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button
          type="button"
          className="modal__button-save modal__button-save_log-in"
          onClick={() => {
            onOpenSignUpModal();
            onClose();
          }}
        >
          <span className="modal__button-save_span">or&nbsp;</span>Sign up
        </button>
      </ModalWithForm>
    </>
  );
};

export default LoginModal;
