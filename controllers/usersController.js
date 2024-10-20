const Users = require("../model/users");

const getAllUsers = async (req, res) => {
    const user = await Users.find();
    if (!user) return res.status(204).json({ 'message': "Notes not found" });
    res.json(user);
};

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Id parameter is required' });
    const user = await Users.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(404).json({ "message": `Note is not found by this ${req.body.id}` });
    }
    const result = await user.deleteOne({_id:req.body.id});
    res.json(result);
};
const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });
    const user = await Users.findOne({_id:req.params.id}).exec();
    if (!user) {
        return res.status(404).json({ "message": `Note is not found by this ${req.params.id}` });
    }
    res.json(user);
};

module.exports = {
   getAllUsers,
   deleteUser,
   getUser
}