const express = require('express')
const Router = express.Router();

const Url = require('../models/url')

// @Route: /:code
// @Desc:  Return to the original website

Router.get('/:code', async (req, res) => {
    try {
        const longUrl = await Url.findOne({ urlCode: req.params.code })

        if (longUrl) {
            return res.redirect(longUrl.longUrl)
        }
        res.status(404).json('Invalid URL')
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
})

module.exports = Router