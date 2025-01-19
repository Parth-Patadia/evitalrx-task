const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('YOUR_MOGO_URL',{
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log('Connected to mongodb');
    }
    catch(error){
        console.error('Error in mongoDB connection : ',error);
        process.exit(1);
    }
};

module.exports = connectDB;
