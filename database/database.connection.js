const mongoose = require("mongoose");

const dbURI = process.env.DBURL || 'mongodb://localhost/node-auth';

const connectDatabase = () => {
    // connect to mongodb
    mongoose.connect(dbURI)
        .then((result) => {
            console.log("Connected to MongoDB successfully", result.connections.values);
        })
        .catch(error => {
            console.log("There was an error connecting to database ", error);
        });
}

module.exports = connectDatabase;