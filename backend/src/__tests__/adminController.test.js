const mongoose = require("mongoose");
const adminController = require("../controllers/adminController");

// Mock the User model
jest.mock("../models/User", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  countDocuments: jest.fn(),
}));

const User = require("../models/User");

describe("Admin Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: {
        _id: new mongoose.Types.ObjectId(),
      },
      query: {},
      params: {},
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

  describe("activateUser", () => {
    test("should return 404 if user not found", async () => {
      req.params.userId = new mongoose.Types.ObjectId().toString();
      User.findById.mockResolvedValue(null);

      await adminController.activateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "User not found",
        })
      );
    });

    test("should return 400 if trying to activate own account", async () => {
      req.params.userId = req.user._id.toString();
      const mockUser = {
        _id: req.user._id,
        email: "admin@example.com",
        fullName: "Admin User",
        role: "admin",
        status: "inactive",
      };

      User.findById.mockResolvedValue(mockUser);

      await adminController.activateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Cannot activate/deactivate your own account",
        })
      );
    });
  });

  describe("deactivateUser", () => {
    test("should return 404 if user not found", async () => {
      req.params.userId = new mongoose.Types.ObjectId().toString();
      User.findById.mockResolvedValue(null);

      await adminController.deactivateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "User not found",
        })
      );
    });

    test("should return 400 if trying to deactivate own account", async () => {
      req.params.userId = req.user._id.toString();
      const mockUser = {
        _id: req.user._id,
        email: "admin@example.com",
        fullName: "Admin User",
        role: "admin",
        status: "active",
      };

      User.findById.mockResolvedValue(mockUser);

      await adminController.deactivateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Cannot activate/deactivate your own account",
        })
      );
    });
  });
});