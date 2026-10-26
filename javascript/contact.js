const contactForm = document.querySelector(".contact-form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("mail");
const subjectSelect = document.getElementById("subject");
const phoneInput = document.getElementById("phone");
const messageTextarea = document.getElementById("message");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");

function showError(input, message) {
    const errorId = `${input.id}-error`;
    let errorMessage = document.querySelector(`#${errorId}`);

    // If the error message element doesn't exist, create it
    if (!errorMessage) {
        errorMessage = document.createElement("span");
        errorMessage.id = errorId;
        errorMessage.className = "form-error";
        input.insertAdjacentElement("afterend", errorMessage);
    }

    errorMessage.textContent = message;
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", errorId);
}

function clearError(input) {
    document.querySelector(`#${input.id}-error`)?.remove();
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
}

function validateName(input) {
    // Regex: Allow letters, spaces, and hyphens, but not numbers or special characters
    const namePattern = /^\p{L}+(?:[ -]\p{L}+)*$/u;

    if (input.value === "" || !namePattern.test(input.value)) {
        if (input.value === "") {
            clearError(input);
        } else {
            showError(input, "Only letters are allowed.");
        }
        return false;
    }

    clearError(input);
    return true;
}

function validateEmail(input) {
    // Regex: Text before @, single @, a domain name, a dot, and a domain suffix
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (input.value === "") {
        clearError(input);
        return false;
    }

    if (!emailPattern.test(input.value)) {
        showError(input, "Please enter a valid email address.");
        return false;
    }

    clearError(input);
    return true;
}

function validateMessage(input) {
    const minimumLength = 20;

    if (input.value === "") {
        clearError(input);
        return false;
    }

    if (input.value.length < minimumLength) {
        showError(input, `Message must be at least ${minimumLength} characters long.`);
        return false;
    }

    clearError(input);
    return true;
}

firstNameInput.addEventListener("input", function () {
    validateName(firstNameInput);
});

lastNameInput.addEventListener("input", function () {
    validateName(lastNameInput);
});

emailInput.addEventListener("input", function () {
    validateEmail(emailInput);
});

messageTextarea.addEventListener("input", function () {
    validateMessage(messageTextarea);
});

resetButton.addEventListener("click", function () {
    clearError(firstNameInput);
    clearError(lastNameInput);
    clearError(emailInput);
    clearError(messageTextarea);
});