const express = require('express')
const Router = express.Router();
const validUrl = require('valid-url')
const shortId = require('shortid')
const config = require('config')

const Url = require('../models/url');


// @route: POST /api/url/shorten
// @desc: Create short url

Router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body
    const baseUrl = config.get('baseUrl')

    if (!validUrl.isUri(baseUrl)) {
        return res.status('401').json('Valid base Url')
    }
 
    // Create URL Code
    const urlCode = shortId.generate();

    // Check long url
    try {
        let url = await Url.findOne({longUrl})
        if (url)
            return res.json(url)
        const shortUrl = baseUrl + '/' + urlCode
        url = new Url({
            longUrl, 
            shortUrl,
            urlCode
        })
        await url.save()
        res.json(url)
    }   
    catch (err) {
        console.log(err)
    }
})

module.exports = Router