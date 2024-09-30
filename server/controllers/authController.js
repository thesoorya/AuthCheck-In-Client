const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { generateTokenAndCookie } = require('../utils/generateToken')

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username, !email, !password) {
            return res.status(400).json({ success: false, message: 'All fields required' })
        }

        const emailRegex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email' })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be atleast 6 characters' })
        }

        const existingUserByEmail = await User.findOne({ email: email })

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: 'Email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateTokenAndCookie(newUser._id, res)
        }

        await newUser.save()

        res.status(200).json({
            success: true, user: {
                ...newUser._doc,
                password: ''
            }
        })


    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        generateTokenAndCookie(user._id, res);

        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: ''
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('notes')
        return res.status(200).json({ success: true, message: 'Logged out successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.authCheck = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.error('Error during auth check:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
