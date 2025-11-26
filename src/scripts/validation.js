export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: ".modal__submit-button-disabled",
  inputErrorClass: ".modal__input_state_error",
  errorClass: ".modal__error",
};

const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add(validationConfig.errorClass);
  errorMsgEl.classList.add("modal__error_visible");
  inputEl.classList.add(validationConfig.inputErrorClass);
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove(validationConfig.errorClass);
  errorMsgEl.classList.remove("modal__error_visible");
  inputEl.classList.remove(validationConfig.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, validationConfig) => {
  if (!inputEl.validity.valid) {
    showInputError(
      formEl,
      inputEl,
      inputEl.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEL, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonEL.disabled = true;
    buttonEL.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonEL.disabled = false;
    buttonEL.classList.remove(validationConfig.inactiveButtonClass);
  }
};

export const resetValidation = (formEl, inputList, validationConfig) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, validationConfig);
  });
};
//!Issue!: Not resetting the EditProfile Modal correctly when passed??

const setEventListeners = (formEl, validationConfig) => {
  const inputList = Array.from(
    formEl.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonEL = formEl.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonEL, validationConfig);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, validationConfig);
      toggleButtonState(inputList, buttonEL, validationConfig);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formEl) => {
    setEventListeners(formEl, validationConfig);
  });
};
