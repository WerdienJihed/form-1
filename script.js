"use strict";
// dom elements
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// functions
const verifyUsername = (input) => {
  return input.length >= 3;
};
const verifyEmail = (input) => {
  return String(input)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const verifyPassword = (input) => {
  return input.length >= 6;
};
const verifyConfirmPassword = (input, password) => {
  return input.length > 0 && input === password;
};

const handleElementError = (element) => {
  const formControl = element.parentElement;
  formControl.className = "form-control error";
  let errorMessage = "";
  switch (element) {
    case username:
      errorMessage = "Username must be at least 3 characters";
      break;
    case email:
      errorMessage = "Email is not valid";
      break;
    case password:
      errorMessage = "Password must be at least 6 characters";
      break;
    case confirmPassword:
      errorMessage = "Confirming password is required";
      break;
    default:
      errorMessage = "Something went wrong!";
      break;
  }
  formControl.querySelector(".error-message").innerText = errorMessage;
};

const handleElementValid = (element) => {
  const formControl = element.parentElement;
  formControl.className = "form-control success";
};

const verifyForm = (e) => {
  e.preventDefault();
  if (!verifyUsername(username.value)) handleElementError(username);
  else handleElementValid(username);
  if (!verifyEmail(email.value)) handleElementError(email);
  else handleElementValid(email);

  if (!verifyPassword(password.value)) handleElementError(password);
  else handleElementValid(password);

  if (!verifyConfirmPassword(confirmPassword.value, password.value))
    handleElementError(confirmPassword);
  else handleElementValid(confirmPassword);
};

// event listeners
form.addEventListener("submit", verifyForm);
