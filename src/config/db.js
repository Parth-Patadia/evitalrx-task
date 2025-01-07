const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb+srv://parth2911:parth2911@ecom-mern.1gl5pdx.mongodb.net/evitalrx',{
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