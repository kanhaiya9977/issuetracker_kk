const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const expressEjsLayouts = require('express-ejs-layouts');

require('dotenv').config();

const port = process.env.port || 8000;
const app = express();
app.use(cors());

app.use(express.urlencoded());

app.use('/', expressEjsLayouts);

app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routers'));



module.exports.startServer = async () => {
    try {
        await mongoose.connect(process.env.mongoDbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected with :: MongoDB")
        app.listen(port, (err) =>{
            if(err) {
                throw new Error(err);
            }
            console.log(`${process.env.environment} server starts at port ${port}`);
        })
    } catch (error) {
        console.log('error', error);
    }
}