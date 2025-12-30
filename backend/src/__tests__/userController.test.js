const mongoose = require("mongoose");
const userController = require("../controllers/userController");

// Mock the User model
jest.mock("../models/User", () => ({
  findById: jest.fn(),
  findOne: jest.fn(),
}));

const User = require("../models/User");

describe("User Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: {
        _id: new mongoose.Types.ObjectId(),
      },
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

  describe("getProfile", () => {
    test("should return 404 if user not found", async () => {
      User.findById.mockResolvedValue(null);

      await userController.getProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "User not found",
        })
      );
    });
  });

  describe("updateProfile", () => {
    test("should return 400 if email already exists", async () => {
      const mockUser = {
        _id: req.user._id,
        email: "old@example.com",
        fullName: "Old Name",
      };

      req.body = {
        email: "taken@example.com",
      };

      User.findById.mockResolvedValue(mockUser);
      User.findOne.mockResolvedValue({
        _id: new mongoose.Types.ObjectId(),
        email: "taken@example.com",
      });

      await userController.updateProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Email already registered",
        })
      );
    });
  });

  describe("changePassword", () => {
    test("should return 401 for incorrect current password", async () => {
      const mockUser = {
        _id: req.user._id,
        comparePassword: jest.fn().mockResolvedValue(false),
      };

      req.body = {
        currentPassword: "WrongPassword",
        newPassword: "NewPassword123",
      };

      User.findById.mockResolvedValue(mockUser);

      await userController.changePassword(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Current password is incorrect",
        })
      );
    });
  });
});