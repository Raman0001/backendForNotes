const Users = require("../model/users");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "both field are required." });
    const Dupilcate = await Users.findOne({ username: user }).exec();
    if (Dupilcate) return res.sendStatus(409);
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        await Users.create({
            "username": user,
            "password": hashedPwd
        });
        res.status(201).json({ "success": `New User ${user} created!` });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
};
module.exports = { handleRegister };