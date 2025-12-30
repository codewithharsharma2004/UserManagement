// Email validation regex
const emailRegex = /^\S+@\S+\.\S+$/;

// Password strength validation: at least 8 chars, one uppercase, one lowercase, one number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Validate email format
const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Validate password strength
const validatePassword = (password) => {
  return passwordRegex.test(password);
};

// Signup validation
const validateSignup = (req, res, next) => {
  const { fullName, email, password } = req.body;
  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters long");
  }

  if (!email || !validateEmail(email)) {
    errors.push("Please provide a valid email address");
  }

  if (!password || !validatePassword(password)) {
    errors.push(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

// Login validation
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !validateEmail(email)) {
    errors.push("Please provide a valid email address");
  }

  if (!password) {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

// Update profile validation
const validateUpdateProfile = (req, res, next) => {
  const { fullName, email } = req.body;
  const errors = [];

  if (fullName !== undefined && fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters long");
  }

  if (email !== undefined && !validateEmail(email)) {
    errors.push("Please provide a valid email address");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

// Change password validation
const validateChangePassword = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const errors = [];

  if (!currentPassword) {
    errors.push("Current password is required");
  }

  if (!newPassword || !validatePassword(newPassword)) {
    errors.push(
      "New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateEmail,
  validatePassword,
};

