const express = require("express");
const { connectToMongoDB } = require("./connect");
const path = require("path"); 
const cookieParser = require("cookie-parser")
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

// Connecting to MongoDB database:
connectToMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); 

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser())

app.use("/",checkAuth, staticRoute);
app.use("/user", userRoute);
app.use("/url",restrictToLoggedinUserOnly, urlRoute);

// for get operations:

app.get("/url/:shortId", async (req, res) => {
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
