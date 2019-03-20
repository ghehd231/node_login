const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();

//db
const db = require('./config/keys').mongoURI;

mongoose.connect(db,{useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.use(expressLayout);
app.set('view engine','ejs');
//express body parser
app.use(express.urlencoded({extended:true}));

app.use("/", require('./routes/index'));
app.use("/users", require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));