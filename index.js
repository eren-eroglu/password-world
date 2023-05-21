const generateButton = document.getElementById("generate-button");
const copyButton = document.getElementById("copy-button");
const passwordLengthInput = document.getElementById("password-length");
const includeUppercaseInput = document.getElementById("include-uppercase");
const includeLowercaseInput = document.getElementById("include-lowercase");
const includeNumbersInput = document.getElementById("include-numbers");
const includeSpecialInput = document.getElementById("include-special");
const generatedPasswordInput = document.getElementById("generated-password");
const passwordList = document.getElementById("password-list");
const strengthMeter = document.getElementById("strength-meter");

generateButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copyPassword);

function generatePassword() {
  const length = parseInt(passwordLengthInput.value);
  const includeUppercase = includeUppercaseInput.checked;
  const includeLowercase = includeLowercaseInput.checked;
  const includeNumbers = includeNumbersInput.checked;
  const includeSpecial = includeSpecialInput.checked;

  if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecial) {
    showErrorPopup("Please select at least one character type.");
    return;
  }

  let charset = "";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) charset += "0123456789";
  if (includeSpecial) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  generatedPasswordInput.value = password;
  updatePasswordStrength(password);
}

function updatePasswordStrength(password) {
  const length = password.length;
  let strength = 0;

  if (length >= 8) {
    strength++;
  }

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    strength++;
  }

  if (/[0-9]/.test(password)) {
    strength++;
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    strength++;
  }

  strengthMeter.classList.remove("strength-weak", "strength-moderate", "strength-strong");

  switch (strength) {
    case 1:
      strengthMeter.classList.add("strength-weak");
      break;
    case 2:
      strengthMeter.classList.add("strength-moderate");
      break;
    case 3:
    case 4:
      strengthMeter.classList.add("strength-strong");
      break;
  }
}

function copyPassword() {
  generatedPasswordInput.select();
  document.execCommand("copy");
  showSuccessPopup("Password copied to clipboard!");
}

function showErrorPopup(message) {
  const errorPopup = document.getElementById('errorpopup');
  errorPopup.textContent = message;
  errorPopup.classList.add("error-popup");
  setTimeout(() => {
    errorPopup.remove();
  }, 3000);
}


function showSuccessPopup(message) {
  const successPopup = document.getElementById("successpopup");
  successPopup.classList.add("success-popup");
  successPopup.textContent = message;
  setTimeout(() => {
    successPopup.textContent = "";
    successPopup.classList.remove("success-popup");
  }, 3000);
}
