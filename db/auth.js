const config = require("../config/dev.js");
const { User } = require("./userDB.js");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign(
    { id: user.id, userName: user.userName, name: user.firstName },
    config.secrets.jwt,
    {
      expiresIn: config.secrets.jwtExp,
    }
  );
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    return res.status(500).end();
  }
};

const signin = async (req, res) => {
  if (!req.body.userName || !req.body.password) {
    return res.status(400).send({ message: "need userName and password" });
  }

  const invalid = { message: "Invalid email and password combination" };

  try {
    const user = await User.findOne({ userName: req.body.userName })
      .select("userName password firstName")
      .exec();

    if (!user) {
      return res.status(401).json(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }
    console.log(match);
    const token = newToken(user);
    return res
      .status(201)
      .send({ token, firstName: user.firstName, userName: user.userName });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

module.exports = { protect, signin, signup, newToken, verifyToken };
