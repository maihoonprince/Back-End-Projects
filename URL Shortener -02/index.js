const express = require("express");
const { connectToMongoDB } = require("./connect");

const urlRoute = require("./routes/url");
const URL = require("./models/url")
const app = express();
const PORT = 8001;

// Connecting to mongodb database :
connectToMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("MongoDB Connected"));

app.use(express.json());


// for get operations:

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    }
    );
    res.redirect(entry.redirectURL);
});

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`server started at PORT : ${PORT}`));