import { emailInputBox, emailInput, passwordInputBox, passwordInput } from "./tags.js";

export const URL = "https://bootcamp-api.codeit.kr";

export const TEST_USER = {
  email: "test@codeit.com",
  password: "codeit101",
};

const isEmail = (email) => {
  return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email);
};

const isPassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
};

export const isSamePassword = (password) => {
  return passwordInput.value === password;
};

export const validateEmail = async (e, isSign) => {
  const inputValue = e.target?.value ?? e;

  if (isSign === "signup") {
    const userEmail = {
      email: inputValue,
    };

    try {
      const response = await fetch(`${URL}/api/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail),
      });

      if (response.status === 409) {
        return setInputError("이미 사용 중인 이메일입니다.", emailInputBox, emailInput);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  if (!inputValue) {
    setInputError("이메일을 입력해주세요.", emailInputBox, emailInput);
  } else if (!isEmail(inputValue)) {
    setInputError("올바른 이메일 주소가 아닙니다.", emailInputBox, emailInput);
  } else if (inputValue !== TEST_USER.email && isSign === "signin") {
    setInputError("이메일을 확인해주세요.", emailInputBox, emailInput);
  } else {
    removeInputError(emailInputBox, emailInput);
  }
};

export const validatePassword = (e, isSign) => {
  const inputValue = e.target?.value ?? e;

  if (!inputValue) {
    setInputError("비밀번호를 입력해주세요.", passwordInputBox, passwordInput);
  } else if (!isPassword(inputValue)) {
    setInputError("비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.", passwordInputBox, passwordInput);
  } else if (inputValue !== TEST_USER.password && isSign === "signin") {
    setInputError("비밀번호를 확인해주세요.", passwordInputBox, passwordInput);
  } else {
    removeInputError(passwordInputBox, passwordInput);
  }
};

export const setInputError = (message, inputBox, input) => {
  if (inputBox.lastElementChild.className === "error-message") {
    const errorSpan = inputBox.lastElementChild;
    errorSpan.textContent = message;
  } else {
    const span = document.createElement("span");
    span.classList.add("error-message");
    input.classList.add("error-box");
    span.textContent = message;
    inputBox.append(span);
  }
};

export const removeInputError = (inputBox, input) => {
  if (inputBox.lastElementChild.className === "error-message") {
    inputBox.lastElementChild.remove();
    input.classList.remove("error-box");
  }
};

export function togglePassword(input, toggleButton) {
  if (input.getAttribute("type") === "password") {
    input.setAttribute("type", "text");
    toggleButton.setAttribute("src", "./images/eye-on.svg");
    return;
  }
  input.setAttribute("type", "password");
  toggleButton.setAttribute("src", "./images/eye-off.svg");
}
