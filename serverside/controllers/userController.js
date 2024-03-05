const User = require("../models/userModel")
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

// User creating an account
const userSignUp = async (req, res) => {

    try {

        // finding user from database
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({
                message: "User already exists",
                error: true,
                success: false
            })
        }

        //convert password into hash
        bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, async function (err, hash) {
                // Store hash in password DB.
                if (err) {
                    return res.status(400).json({
                        message: err,
                        error: true,
                        success: false
                    })
                }
                console.log("hash", hash)

                const payload = {
                    ...req.body,
                    password: hash
                }

                const userDetails = new User(payload)
                const save = await userDetails.save()

                return res.status(200).json({
                    message: "Account created successfully",
                    data: save,
                    error: false,
                    success: true
                })

            });
        });
    } catch (error) {
        res.status(500).json({
            message: error,
            error: true,
            success: false
        })
    }
}

// User logging in
const userSignin = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not available",
                error: true,
                success: false
            })
        }

        // Compare password hashes
        bcryptjs.compare(password, user.password, function (err, passwordMatch) {
            //passwordMatch is true
            if (err) {
                return res.status(400).json({
                    message: "Check your password",
                    error: true,
                    success: false
                })
            }

            if (!passwordMatch) {
                return res.status(400).json({
                    message: "Incorrect password",
                    error: true,
                    success: false
                })
            }

            const payload = {
                _id: user._id,
                email: user.email
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })

            res.status(200).json({
                token: token,
                error: false,
                success: true,
                message: "Login successfully"
            })
        })

    } catch (err) {
        res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = { userSignUp, userSignin };