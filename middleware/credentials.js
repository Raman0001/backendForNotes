const allowedList = require("../config/allowedList");

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedList.includes(origin)) {
        res.header("Access-Control-Allow-Credientials", true);
    }
    next();
}
module.exports = { credentials };