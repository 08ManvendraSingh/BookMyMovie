export const validateLoginData = (inputData) => {
  const { email, password } = inputData;

  let Errors = {};

  // Email
  if (!email?.trim()) {
    Errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim())) {
    Errors.email = "Enter a valid email address";
  }

  // password
  if (!password?.trim()) {
    Errors.password = "Password is required";
  } else if (password.length < 3 || password.length > 20) {
    Errors.password = "Password must be between 3 and 20 characters";
  }

  return Errors;
};

export const validateSignupData = (inputData) => {
  const { userName, email, password } = inputData;

  let Errors = {};

  // userName
  if (!userName?.trim()) {
    Errors.userName = "userName is required";
  } else if (userName.length < 3 || userName.length > 20) {
    Errors.userName = "userName must be between 3 and 20 characters";
  }

  // email
  if (!email?.trim()) {
    Errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim())) {
    Errors.email = "Enter a valid email address";
  }

  // password
  if (!password?.trim()) {
    Errors.password = "Password is required";
  } else if (password.length < 3 || password.length > 20) {
    Errors.password = "Password must be between 3 and 20 characters";
  }

  return Errors;
};
