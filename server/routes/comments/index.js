const express = require('express');
const router = express.Router();
const db = require('../../config/dbconfig');
const uuid = require('uuid/v4')

router.post('/comment', async (req, res) => {
    try {
        let data = req.body;
        data._id = uuid();
        data.timestamp = Date.now();
        let insertedData = await db.getDb().collection('comments').insertOne(data)

        res.send({
            status: 200,
            success: true,
            message: "Successfully Added the Comment",
            data: insertedData.ops[0]
        })
    }
    catch (error) {
        res.send({
            status: 500,
            success: false,
            message: "Something went wrong"
        })
    }
})

router.get('/comment', async (req, res) => {
    try {
        let allComments = await db.getDb().collection('comments').find().sort({ timestamp: -1 }).toArray()
        // console.log(allComments)
        res.send({
            status: 200,
            success: true,
            data: allComments
        })
    }
    catch (error) {
        res.send({
            status: 500,
            success: false,
            message: "Something went wrong",
            data: error
        })
    }
})

// API's for posts

router.post('/post', async (req, res) => {
    try {
        let data = req.body;
        data._id = uuid();
        data.timestamp = Date.now();
        let insertedData = await db.getDb().collection('posts').insertOne(data)

        res.send({
            status: 200,
            success: true,
            message: "Successfully Added the Comment",
            data: insertedData.ops[0]
        })
    }
    catch (error) {
        res.send({
            status: 500,
            success: false,
            message: "Something went wrong"
        })
    }
})

router.get('/post', async (req, res) => {
    try {
        let allComments = await db.getDb().collection('posts').find().sort({ timestamp: -1 }).toArray()
        // console.log(allComments)
        res.send({
            status: 200,
            success: true,
            data: allComments
        })
    }
    catch (error) {
        res.send({
            status: 500,
            success: false,
            message: "Something went wrong",
            data: error
        })
    }
})

router.put('/update', async (req, res) => {
    try {
        let updatedData = await db.getDb().collection('posts').findOneAndUpdate({ _id: req.body.id }, { $set: req.body.fieldData })
        if (updatedData) {
            res.send({
                success: true,
                status: 200,
                data: updatedData.value
            })
        }
        else {
            let updatedData1 = await db.getDb().collection('comments').findOneAndUpdate({ _id: req.body.id }, { $set: req.body.fieldData })
            res.send({
                success: true,
                status: 200,
                data: updatedData1.value
            })
        }

    }
    catch (error) {
        res.send({
            success: false,
            status: 500,
            data: error
        })
    }
})

module.exports = { commentRoutes: router }