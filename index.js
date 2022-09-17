const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");

dotenv.config();

const authRoute = require("./routes/auth");
const passportStrategy = require("./passport");
const logger = require("./utils/logger");

const app = express();
const FRONT_LIST = [process.env.FRONT1, process.env.FRONT2, process.env.FRONT3]

app.use(
	cookieSession({
		name: "session",
		keys: ["feedback"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: FRONT_LIST, credentials: true }));

app.use("/auth", authRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => logger.info(`Listenting on port ${PORT}...`));
