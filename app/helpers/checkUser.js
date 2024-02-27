const db = require("../models");
const User = db.user;

const isAdmin = async (userId) => {
    isCurrentUserAdmin = false;
    const user = await User.findByPk(userId);
    const userRoles = await user.getRoles();
    for (let i = 0; i < userRoles.length; i++) {
        if (userRoles[i].name === "admin") {
            isCurrentUserAdmin = true;
        }
    }
    return isCurrentUserAdmin
};


const check = {
    isAdmin: isAdmin,
};
module.exports = check;