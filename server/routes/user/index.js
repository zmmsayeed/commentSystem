const express = require('express');
const router = express.Router();
const db = require('../../config/dbconfig');
const uuid = require('uuid/v4');
var bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    try {
        let user = await db.getDb().collection('users').findOne({ email: req.query.email })


        if (user) {
            let password = req.body.password;
            let hash = user.password
            bcrypt.compare(password, hash, function (err, result) {
                if (result) {
                    res.send({
                        status: 200,
                        message: "User found",
                        success: true,
                        data: user
                    })
                }
                else {
                    res.send({
                        status: 500,
                        message: "Username/Password is wrong",
                        success: false,
                        data: user
                    })
                }
            });
        }
        else {
            res.send({
                status: 500,
                message: "User not found",
                success: false
            })
        }
    }
    catch (error) {
        res.send({
            status: 500,
            success: false,
            message: "Something went wrong"
        })
    }
})

router.post('/register', async (req, res) => {
    try {

        let foundUser = await db.getDb().collection('users').findOne({ email: req.body.email })
        if (foundUser) {
            res.send({
                status: 409,
                success: false,
                message: "User already exists"
            })
        }
        else {

            let email = req.body.email;
            let password = req.body.password;

            let data = {
                email: email,
                password: password
            }

            data._id = uuid();
            data.timestamp = Date.now();
            let insertedData = await db.getDb().collection('users').insertOne(data);

            res.send({
                status: 200,
                success: true,
                message: "User registered Successfully",
                data: insertedData.ops[0]
            })
        }
    }
    catch (error) {
        res.send({
            success: false,
            status: 500,
            message: "Something went wrong",
            data: error
        })
    }
})

module.exports = { userRoutes: router }