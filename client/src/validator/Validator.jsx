const USERNAME_REGEX = /^[a-zA-Z0-9]{4,14}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^[^\s]{6,}$/;

export const isUserNameValid = (value) => USERNAME_REGEX.test(value);
export const isEmailValid = (value) => EMAIL_REGEX.test(value);
export const isPasswordValid = (value) => PASSWORD_REGEX.test(value);