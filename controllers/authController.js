const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const saltRounds = 10;
const secretKey = 'your_secret_key';

exports.register = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email đã được đăng ký');
        }

        const passwordHash = await bcrypt.hash(password, saltRounds);

        const userRoles = await Role.find({ name: { $in: roles } });

        const newUser = new User({
            username,
            email,
            passwordHash,
            roles: userRoles.map(role => role._id)
        });

        await newUser.save();
        res.status(201).send('Đăng ký thành công');
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate('roles');
        if (!user) {
            return res.status(404).send('Người dùng không tồn tại');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).send('Mật khẩu không đúng');
        }

        const token = jwt.sign(
            { userId: user._id, roles: user.roles },
            secretKey,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        res.send('Đăng nhập thành công');
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server');
    }
};
