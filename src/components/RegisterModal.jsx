import { useEffect, useState } from "react";
import "../blocks/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm.jsx";

const RegisterModal = ({
  isOpen,
  onSignUp,
  onClose,
  onOpenLoginModal,
  setEmailError,
  emailError,
  serverError,
  setServerError,
}) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  useEffect(() => {
    if (!isOpen) return; // stop the effect if the modal is not open

    setName("");
    setEmail("");
    setPassword("");
  }, [isOpen, onClose]); // watch isOpen to add the listeners only when the modal is open

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    let value = e.target.value;
    setEmail(value);
    value = "";
    // Clear server error on edit
    if (serverError) setServerError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();

    const submittedData = { name, email, password };
    console.log(name, email, password);
    onSignUp(submittedData);
  }
  const isFormValid = email.trim() !== "" && password.trim() !== "";
  return (
    <>
      <ModalWithForm
        title="Sign up"
        name="sign-up"
        onClose={onClose}
        isOpen={isOpen}
        buttonText="Sign up"
        buttonClass="modal__button-save"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        serverError={serverError}
        emailError={emailError}
        isSubmitDisabled={!isFormValid}
      >
        <label htmlFor="email" className="modal__input-label">
          {" "}
          Email{" "}
        </label>
        <input
          type="email"
          id="email"
          className={`modal__input ${
            emailError ? "modal__input_email-error" : ""
          }`}
          placeholder="Enter email"
          required
          minLength="2"
          maxLength="30"
          name="email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="email"
        />
        {emailError && <span className="modal__error">{emailError}</span>}

        <label htmlFor="password" className="modal__input-label">
          Password
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
        <label htmlFor="name" className="modal__input-label">
          {" "}
          Username{" "}
        </label>
        <input
          type="text"
          id="name"
          className={`modal__input  ${
            serverError ? "modal__input_email-taken" : ""
          }`}
          placeholder="Enter your username"
          required
          minLength="2"
          maxLength="30"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <button
          type="button"
          className="modal__button-save modal__button-save_log-in"
          onClick={() => {
            onOpenLoginModal();
            onClose();
          }}
        >
          <span className="modal__button-save_span">or&nbsp;</span>Sign in
        </button>
      </ModalWithForm>
    </>
  );
};

export default RegisterModal;
