const Users = require("../model/users");

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt;

    const foundUser = await Users.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true });
        return res.sendStatus(204);
    } // forbidden
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    await foundUser.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
}
module.exports = { handleLogout }