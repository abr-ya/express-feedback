const router = require("express").Router();
const passport = require("passport");
const logger = require("../utils/logger");

const normalizeUser = (user) => ({
	id: user.id,
	name: user.name.givenName,
	fullName: user.displayName,
	email: user._json.email,
	ava: user._json.picture,
});

router.get("/login/success", (req, res) => {
	if (req.user) {
		const user = normalizeUser(req.user);
		logger.info(`Login User: ${user.fullName}`);
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google"),
	(req, res) => {
		logger.info(`/google/callback redirect to ${req.headers.referer}`);
		// res.redirect(process.env.CLIENT_URL);
		res.redirect(req.headers.referer);
	}
);

router.get("/logout", (req, res) => {
	logger.info(`Logout: ${req.user.id}`);
	req.logout();
	// res.redirect(process.env.CLIENT_URL);
	res.redirect(req.headers.referer);
});

module.exports = router;
