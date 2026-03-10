/*
 * Method: POST
 * URL: /login
 * Body: Yes (email, password)
 * Params: No
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

async function login(req, res) {
  const email = req.body.email?.trim();
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email or password missing"
    });
  }

  try {

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true
      }
    });
    
    if (!user) {
      return res.status(401).send({
        success:false,
        message: "Invalid credentials - line 36"
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).send({
        success:false,
        message: "Invalid credentials - line 44"
      });
    }

    const payload = {
      id: user.id,
      email: user.email
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.send({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = login;