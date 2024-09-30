const express = require('express')
const router = express.Router()

router.get('/getdata', (req, res) => {
    res.status(200).json({success: true, message: 'data received'})
})

module.exports = router