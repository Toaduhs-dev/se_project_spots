const settings = {
  formSelector: "modal__form",
  inputSelector: "modal__input",
  submitButtonSelector: "modal__submit-button",
  inactiveButtonClass: "modal__submit-button-disabled",
  inputErrorClass: "modal__input_state_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add(config.errorClass);
  errorMsgEl.classList.add(".modal__error_visable");
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove(config.errorClass);
  errorMsgEl.classList.remove(".modal__error_visable");
  inputEl.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEL) => {
  if (hasInvalidInput(inputList)) {
    buttonEL.disabled = true;
    buttonEL.classList.add(config.inactiveButtonClass);
  } else {
    buttonEL.disabled = false;
    buttonEL.classList.remove(config.inactiveButtonClass);
    buttonEL.classList.add(config.inactiveButtonClass);
    toggleButtonState(inputList, buttonEL, config);
  }
};

const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });
};
//!Issue!: Not resetting the EditProfile Modal correctly when passed??

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEL = formEl.querySelector(config.submitButtonSelector);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
