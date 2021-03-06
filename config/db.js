 const mongoose = require('mongoose');


 const connectDB =async () => {

    try {
        const connection = await mongoose.connect(process.env.MONO_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        });
        console.log(
          `MongoDb Connected  : ${connection.connection.host}`.cyan.underline
            .bold
        );
    } catch (error) {
        
        console.log(`Error : ${error.message}`.red)
        process.exit(1);
    }

 }

 module.exports = connectDB ;