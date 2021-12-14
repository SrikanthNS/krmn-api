const db = require("../models");
const User = db.user;

const isAdmin = (userId) => {
    User.findByPk(userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    return true;
                }
            }
            return false;
        });
    });
};


const check = {
    isAdmin: isAdmin,
};
module.exports = check;