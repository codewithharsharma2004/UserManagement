const mongoose = require("mongoose");
const authController = require("../controllers/authController");

// Mock the User model
jest.mock("../models/User", () => {
  const mockUser = {
    _id: new mongoose.Types.ObjectId(),
    email: "test@example.com",
    fullName: "Test User",
    role: "user",
    status: "active",
    comparePassword: jest.fn(),
    save: jest.fn(),
  };

  return {
    findOne: jest.fn(),
    findById: jest.fn(),
    __esModule: true,
    default: jest.fn(() => mockUser),
  };
});

// Mock JWT
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mock-token"),
  verify: jest.fn(),
}));

const User = require("../models/User");

describe("Auth Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signup", () => {
    test("should return 400 if user already exists", async () => {
      req.body = {
        email: "existing@example.com",
        password: "Password123",
        fullName: "Existing User",
      };

      User.findOne.mockResolvedValue({
        email: "existing@example.com",
      });

      await authController.signup(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Email already registered",
        })
      );
    });
  });

  describe("login", () => {
    test("should return 401 for invalid email", async () => {
      req.body = {
        email: "nonexistent@example.com",
        password: "Password123",
      };

      User.findOne.mockResolvedValue(null);

      await authController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Invalid email or password",
        })
      );
    });

    test("should return 401 for invalid password", async () => {
      req.body = {
        email: "user@example.com",
        password: "WrongPassword",
      };

      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(false),
      };

      User.findOne.mockResolvedValue(mockUser);

      await authController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Invalid email or password",
        })
      );
    });
  });
});