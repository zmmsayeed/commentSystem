const express = require('express');
const router = express.Router();
const db = require('../../config/dbconfig');
const uuid = require('uuid/v4')

router.post('/', async (req, res) => {
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



module.exports = { commentRoutes: router }