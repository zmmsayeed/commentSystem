const express = require('express');
const router = express.Router();
const db = require('../../config/dbconfig');
const uuid = require('uuid/v4')

router.get('/', async (req, res) => {
    console.log(req.query)
    try {
        let user = await db.getDb().collection('users').findOne({ email: req.query.email })
        if(user) {
            res.send({
                status: 200,
                message: "User found",
                success: true
            })
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
            let data = req.body;
            data._id = uuid()
            let insertedData = await db.getDb().collection('users').insertOne(data)

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