const allowedList = require("./allowedList");

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedList.indexOf(origin) !== -1 || !origin) {
            // remove !origin after work complete
            callback(null, true);
        } else {
            return callback(new Error('Not allowed by cors'), false);
        };
    },
    credentials:true,
    optionsSuccessStatus: 204
}

module.exports = corsOptions;