const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" });
    
    let shortID;
    if (body.customId && body.customId.trim()) {
        shortID = body.customId.trim().replace(/[^a-zA-Z0-9_-]/g, "");
        const existing = await URL.findOne({ shortId: shortID });
        if (existing) {
            return res.status(400).json({ error: "Custom short alias already taken" });
        }
    } else {
        shortID = shortid();
    }

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    const host = req.get("host");
    const protocol = req.protocol;
    const shortUrl = `${protocol}://${host}/${shortID}`;

    return res.status(201).json({ id: shortID, shortUrl });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}


module.exports ={
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}