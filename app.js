const express = require("express");
const path = require("path");
// const fs = require("fs");
var mongoose = require("mongoose");
const app = express();
mongoose.connect('mongodb://localhost:/gym' , 
{useNewUrlParser: true,
    useUnifiedTopology: true
});
const port = 80;

// Define MOngoose Schema
const gymSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    more: String,
});
var GYM = mongoose.model('GYM', gymSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded()); 

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
// app.get('/', (req, res)=>{
//     const con = "This is the best content on the internet so far so use it wisely"
//     const params = {'title': 'POWER HOUSE GYM', "content": con}
//     res.status(200).render('index.pug', params);
// })

// app.post('/', (req, res) => {
//     name = req.body.name
//     age = req.body.age
//     gender = req.body.gender
//     address = req.body.address
//     more = req.body.more
//     let outputToWrite = `the name of the client is ${name}, ${age} and years old, ${gender}, residing at${address}, more about him/her : ${more}`
//     fs.writeFileSync('output.txt', outputToWrite)
//     const params = {'message': 'Your form has been submitted successfully'}
//     res.status(200).render('index.pug', params);

// });
app.get('/', (req, res) =>{
    const params = {}
    res.status(200).render('index.pug', params);
})

app.post('/', (req, res) => {
    var myData = new GYM(req.body);
    myData.save().then(() =>{
        res.end("This data has been saved successfully")
    }).catch(() =>{
        res.status(400).render("This data has not saved");
});
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
