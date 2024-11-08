 const { User } = require('../../db');
 const bcrypt = require('bcryptjs');
 const validateRequiredFields = require('../../utils/validateRequiredFields');

 const createUser = async(req, res) => {
    try {
        const {username, email, password, role} = req.body; 

        const errorMessage = validateRequiredFields(req.body, ['username', 'email', 'role', 'password']);
        if (errorMessage) {
            return res.status(400).json({ error: `Error creating user: Bad request, ${errorMessage}` });
        }
        const existingUser = await User.findOne({
            where: {email: email}
        })
        const hashPassword = await bcrypt.hash(password, 10);
        if(!existingUser){
            const newUser = {
                username,
                email,
                password: hashPassword,
                role
            }
            const createdUser = await User.create(newUser)
            return res.status(200).json(createdUser)
        }
        return res.status(409).json({message: "There is already a user with this email"})        
    } catch (error) {
        res.status(500).json({error: "Error creating user"})
    }
 }

 module.exports = createUser;