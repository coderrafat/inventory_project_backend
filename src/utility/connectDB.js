const mongoose = require('mongoose')

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('✅ Database has been Connected!')
    } catch (error) {
        console.log('❌ Database has been not Connected!')
    }
};
