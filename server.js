require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errHandler");
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require("cookie-parser");
const { dbConnnect } = require("./config/dbConnect");
const { credentials } = require("./middleware/credentials");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 3500;

dbConnnect();
app.use(logger);
app.use(credentials);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./Routes/root'));
app.use('/register', require("./Routes/register"));
app.use('/auth', require("./Routes/auth"));
app.use('/refresh', require("./Routes/refresh"));
app.use('/logout', require("./Routes/logout"));

app.use(verifyJWT);
app.use('/notes', require("./Routes/api/notes"));
app.use('/users', require("./Routes/api/users"));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) res.sendFile(path.join(__dirname, 'views', '404.html'));
    else if (req.accepts('json')) res.json({ error: "404 Not Found" });
    else res.type('txt').send("404 Not Found");
});
app.use(errHandler);
mongoose.connection.once("open", () => {
    console.log(("Connect To Database"));
    app.listen(PORT, () => { console.log(`Server Running On PORT ${PORT}`) });
});