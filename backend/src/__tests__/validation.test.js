const {
  validateEmail,
  validatePassword,
  validateSignup,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
} = require("../middleware/validation");

describe("Validation Middleware", () => {
  describe("validateEmail", () => {
    test("should return true for valid email addresses", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("user.name@domain.co.uk")).toBe(true);
      expect(validateEmail("user+tag@example.com")).toBe(true);
    });

    test("should return false for invalid email addresses", () => {
      expect(validateEmail("invalid")).toBe(false);
      expect(validateEmail("invalid@")).toBe(false);
      expect(validateEmail("@example.com")).toBe(false);
      expect(validateEmail("user@")).toBe(false);
      expect(validateEmail("")).toBe(false);
    });
  });

  describe("validatePassword", () => {
    test("should return true for valid passwords", () => {
      expect(validatePassword("Password123")).toBe(true);
      expect(validatePassword("MyP@ssw0rd")).toBe(true);
      expect(validatePassword("Test1234")).toBe(true);
    });

    test("should return false for invalid passwords", () => {
      expect(validatePassword("short")).toBe(false); // Too short
      expect(validatePassword("nouppercase123")).toBe(false); // No uppercase
      expect(validatePassword("NOLOWERCASE123")).toBe(false); // No lowercase
      expect(validatePassword("NoNumbersHere")).toBe(false); // No numbers
      expect(validatePassword("")).toBe(false); // Empty
    });
  });
});

describe("validateSignup middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("should call next() for valid signup data", () => {
    req.body = {
      fullName: "John Doe",
      email: "john@example.com",
      password: "Password123",
    };

    validateSignup(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test("should return 400 for invalid email", () => {
    req.body = {
      fullName: "John Doe",
      email: "invalid-email",
      password: "Password123",
    };

    validateSignup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 400 for weak password", () => {
    req.body = {
      fullName: "John Doe",
      email: "john@example.com",
      password: "weak",
    };

    validateSignup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 400 for short full name", () => {
    req.body = {
      fullName: "A",
      email: "john@example.com",
      password: "Password123",
    };

    validateSignup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});

describe("validateLogin middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("should call next() for valid login data", () => {
    req.body = {
      email: "john@example.com",
      password: "Password123",
    };

    validateLogin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test("should return 400 for invalid email", () => {
    req.body = {
      email: "invalid-email",
      password: "Password123",
    };

    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 400 for missing password", () => {
    req.body = {
      email: "john@example.com",
      password: "",
    };

    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
