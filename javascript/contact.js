const contactForm = document.querySelector(".contact-form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("mail");
const subjectSelect = document.getElementById("subject");
const phoneInput = document.getElementById("phone");
const messageTextarea = document.getElementById("message");
const characterCounter = document.getElementById("message-counter");
const successMessage = document.getElementById("success-message");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");
const minimumMessageLength = 20;
let successTimeoutId;

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
    input.classList.add("is-error");
    input.classList.remove("is-valid");
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", errorId);
}

function clearError(input) {
    document.querySelector(`#${input.id}-error`)?.remove();
    input.classList.remove("is-error", "is-valid");
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
}

function markValid(input) {
    clearError(input);
    input.classList.add("is-valid");
}

// Clear all error messages and reset the character counter, form fields are cleared in HTML
function clearForm() {
    clearError(firstNameInput);
    clearError(lastNameInput);
    clearError(emailInput);
    clearError(subjectSelect);
    clearError(messageTextarea);

    characterCounter.textContent = `0 / ${minimumMessageLength} characters`;
    characterCounter.classList.remove("long-enough");
    characterCounter.classList.add("too-short");
}

function validateName(input) {
    // Regex: Allow letters, spaces, and hyphens, but not numbers or special characters
    const namePattern = /^\p{L}+(?:[ -]\p{L}+)*$/u;

    if (input.value === "") {
        showError(input, "This field is required.");
        return false;
    }

    if (!namePattern.test(input.value)) {
        showError(input, "Only letters are allowed.");
        return false;
    }

    markValid(input);
    return true;
}

function validateEmail(input) {
    // Regex: Text before @, single @, a domain name, a dot, and a domain suffix
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (input.value === "") {
        showError(input, "This field is required.");
        return false;
    }

    if (!emailPattern.test(input.value)) {
        showError(input, "Please enter a valid email address.");
        return false;
    }

    markValid(input);
    return true;
}

function validateMessage(input) {
    const characterCount = input.value.length;
    const isValid = characterCount >= minimumMessageLength;

    characterCounter.textContent = `${characterCount} / ${minimumMessageLength} characters`;

    if (isValid) {
        characterCounter.classList.add("long-enough");
        characterCounter.classList.remove("too-short");
        markValid(input);
    } else {
        characterCounter.classList.add("too-short");
        characterCounter.classList.remove("long-enough");
        input.classList.add("is-error");
        input.classList.remove("is-valid");
    }

    return isValid;
}

function validateSubject(input) {
    if (input.value === "") {
        showError(input, "Please select a subject.");
        return false;
    }

    markValid(input);
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

subjectSelect.addEventListener("change", function () {
    validateSubject(subjectSelect);
});

messageTextarea.addEventListener("input", function () {
    validateMessage(messageTextarea);
});

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstNameIsValid = validateName(firstNameInput);
    const lastNameIsValid = validateName(lastNameInput);
    const emailIsValid = validateEmail(emailInput);
    const subjectIsValid = validateSubject(subjectSelect);
    const messageIsValid = validateMessage(messageTextarea);

    const formIsValid =
        firstNameIsValid &&
        lastNameIsValid &&
        emailIsValid &&
        subjectIsValid &&
        messageIsValid;

    if (formIsValid) {
        const firstName = firstNameInput.value;
        contactForm.reset();
        clearForm();
        successMessage.textContent =
            `Thank you ${firstName}! I will contact you soon!`;
        successMessage.hidden = false;

        clearTimeout(successTimeoutId);
        successTimeoutId = setTimeout(function () {
            successMessage.textContent = "";
            successMessage.hidden = true;
        }, 3000);
    }
});

// Initial validation to show 0/20 characters on page load
validateMessage(messageTextarea);

resetButton.addEventListener("click", function () {
    clearForm();
    clearTimeout(successTimeoutId);
    successMessage.textContent = "";
    successMessage.hidden = true;
});