export const isEmpty = (str) => str.trim() === '';

export const isAlpha = (str) => /^[A-Za-z\s]+$/.test(str);

export const withoutNumbersAndSpecialChars = (str) => str.replace(/[^A-Za-z\s]/g, '');
