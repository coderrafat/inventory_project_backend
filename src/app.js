//!Basic import
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 6000;
const { connectDB } = require('./utility/connectDB');
const router = require('./router');
// const parseFormData = require('./middlewares/parseFormData');


//!Error handler
const createError = require('http-errors')

//!Security middlewares import
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

// app.use(parseFormData)


//!Rate limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
    message: 'To many requests from this IP. Please try again later'
});


//! Only for accept my client side application
// app.use((req, res, next) => {
//     const myClientApplication = req.headers.origin;

//     if (myClientApplication !== "") {
//         throw createError(406, "Your request not acceptable");
//     }
//     next();
// });


//!Security middlewares implement
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());
app.use(limiter);

app.use(express.json({ limit: '5mb' }));


//!Managing Backend routing
// readdirSync("./src/routes").map(r => app.use("/api", require(`./src/routes/${r}`)));
app.use('/api', router)


//!Undifiend Route
app.use('*', (req, res, next) => {
    next(createError(404, 'Route Not Found'));
})


//!Server Error Handling - All the errors
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json({
        success: false,
        message: error.message
    })
})


//!Server Listening
app.start = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`✅ Server Running Port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = app;