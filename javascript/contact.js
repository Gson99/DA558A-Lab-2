const contactForm = document.querySelector(".contact-form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("mail");
const subjectSelect = document.getElementById("subject");
const phoneInput = document.getElementById("phone");
const messageTextarea = document.getElementById("message");
const submitButton = document.querySelector("#submit-button");
const resetButton = document.querySelector("#reset-button");

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
    if (input.value === "" || !/^\p{L}+(?:[ -]\p{L}+)*$/u.test(input.value)) {
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

firstNameInput.addEventListener("input", function () {
    validateName(firstNameInput);
});

lastNameInput.addEventListener("input", function () {
    validateName(lastNameInput);
});