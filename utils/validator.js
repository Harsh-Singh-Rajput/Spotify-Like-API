const validateName = (name) => {
  const nameRegex = new RegExp("^[A-Za-z]\\w{4,29}$");
  return nameRegex.test(name);
};

const validateEmail = (email) => {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9_+&*-]+(?:\\." +
      "[a-zA-Z0-9_+&*-]+)*@" +
      "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
      "A-Z]{2,7}$"
  );
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = new RegExp(
    "^(?=.*[0-9])" +
      "(?=.*[a-z])(?=.*[A-Z])" +
      "(?=.*[@#$%^&+=])" +
      "(?=\\S+$).{8,20}$"
  );
  return passwordRegex.test(password);
};

export { validateName, validateEmail, validatePassword };
