const { User } = require('../../db');

const getUserList = async (req, res) => {
    try {
        const users = await User.findAll({});
        if(!users){
            return res.status(200).json({ message: "Users list empty" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error retrieving users list" });
    }
}

module.exports = getUserList;