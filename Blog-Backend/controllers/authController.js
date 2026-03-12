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
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials"
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

    // 👇 set cookie instead of returning token in response
    res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",  // 👈
    maxAge: 7 * 24 * 60 * 60 * 1000
})

    return res.json({
      success: true,
      message: "Login successful"
      // 👈 no token in response body
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = login;