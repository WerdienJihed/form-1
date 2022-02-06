"use strict";
// dom elements
const container = document.querySelector(".container");
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal_btn");

// functions
const resetFormErrors = () => {
  form
    .querySelectorAll(".form-control")
    .forEach((formControl) => (formControl.className = "form-control"));
};

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const errorContainer = formControl.querySelector(".error-message");
  errorContainer.innerText = message;
};

const checkRequired = (input) => {
  if (input.value.trim() === "") {
    showError(input, `${input.name} is required!`);
    return true;
  }
  return false;
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${input.name} must be at least ${min} characters!`);
    return true;
  }
  if (input.value.length > max) {
    showError(input, `${input.name} must be less than ${max} characters!`);
    return true;
  }
  return false;
};

const checkStartWithLetter = (input) => {
  const isFirstCharacterAlphabet = /^[A-Za-z]/.test(input.value);
  if (!isFirstCharacterAlphabet) {
    showError(input, `${input.name} must start with a letter!`);
    return true;
  }
  return false;
};

const checkEmailFormat = (email) => {
  const isValidEmailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email.value
    );

  if (!isValidEmailFormat) {
    showError(email, `Email is not valid!`);
    return true;
  }
  return false;
};
const checkAlphaNumSym = (password) => {
  const isValid = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?])/.test(
    password.value
  );
  if (!isValid)
    showError(
      password,
      `Password should contain lowercase,uppercase letter ,symbol and number and does not contain white spaces!`
    );
};
const checkPasswordsMatch = (password, ConfirmPassword) => {
  if (password.value !== confirmPassword.value)
    showError(confirmPassword, `Passwords do not match!`);
};

/* Fields validation */
const checkUsername = (username) => {
  if (checkRequired(username)) return false;
  if (checkStartWithLetter(username)) return false;
  if (checkLength(username, 3, 15)) return false;
  return true;
};

const checkEmail = (email) => {
  if (checkRequired(email)) return false;
  if (checkEmailFormat(email)) return false;
  return true;
};

const checkPassword = (password) => {
  if (checkRequired(password)) return false;
  if (checkLength(password, 6, 25)) return false;
  if (checkAlphaNumSym(password)) return false;
  return true;
};
const checkConfirmPassword = (password, confirmPassword) => {
  if (checkRequired(confirmPassword)) return false;
  if (checkPasswordsMatch(password, confirmPassword)) return false;
  return true;
};

/* Form validation */
const verifyForm = (e) => {
  e.preventDefault();
  resetFormErrors();
  if (
    checkUsername(username) &&
    checkEmail(email) &&
    checkPassword(password) &&
    checkConfirmPassword(password, confirmPassword)
  ) {
    modal.classList.add("show");
    container.classList.add("blur");
  }
};

// event listeners
form.addEventListener("submit", verifyForm);
modalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  container.classList.remove("blur");
});
const init = () => {
  username.value = "A00";
  email.value = "informatique.jihed@gmail.com";
  password.value = "pqC6#!5fbc";
  confirmPassword.value = "pqC6#!5fbc";
};

init();
