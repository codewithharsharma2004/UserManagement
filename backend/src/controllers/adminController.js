const User = require("../models/User");

// Get all users with pagination
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        usersPerPage: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Activate user
exports.activateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Prevent deactivating self
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot activate/deactivate your own account",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = "active";
    await user.save();

    res.json({
      success: true,
      message: "User activated successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Deactivate user
exports.deactivateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Prevent deactivating self
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot activate/deactivate your own account",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = "inactive";
    await user.save();

    res.json({
      success: true,
      message: "User deactivated successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};
