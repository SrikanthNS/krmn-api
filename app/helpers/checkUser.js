const db = require("../models");
const User = db.user;

const isAdmin = async (userId) => {
  let isCurrentUserAdmin = false;
  const user = await User.findByPk(userId);
  const userRoles = await user.getRoles();
  for (let i = 0; i < userRoles.length; i++) {
    if (userRoles[i].name === "admin") {
      isCurrentUserAdmin = true;
    }
  }
  return isCurrentUserAdmin;
};

const isAdminOrMod = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) return false;
    const userRoles = await user.getRoles();
    return userRoles.some((r) => r.name === "admin" || r.name === "moderator");
  } catch (err) {
    console.error("[isAdminOrMod] Error checking roles:", err.message);
    return false;
  }
};

const check = {
  isAdmin,
  isAdminOrMod,
};
module.exports = check;
