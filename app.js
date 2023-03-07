//* node modules

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
const mongoose = require('mongoose')
app.use(express.static('public'))
mongoose.connect("mongodb+srv://Vamshi2000:Vamshi2000@shop.o056e69.mongodb.net/shopDB")
const shopShema = mongoose.Schema({
    phoneNumber: Number,
    details: {
        place: String,
        name: String,
        father: String,
        amount: Number,
        date: String,
        itemName: String,
        rateOfIntrest: Number
        // img:       //// Image
        // {
        //     data: Buffer,
        //     contentType: String
        // }

    }

})
const SHOP = mongoose.model("customer", shopShema)

//? local-variables 

let pass = 0
const port = 3000
const date = new Date();
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}

const dateIN = formatDate(date)



//? routes 
app.get("/", (req, res) => {
    res.render('auth')

})

app.post('/', (req, res) => {
    const userName = req.body.userName
    const password = req.body.password

    if (userName === "kvs" && password === "2000") {
        res.redirect('/home')
        pass = 2000
    } else {
        res.render('error')
    }


})

app.get('/home', (req, res) => {
    if (pass === 2000) {
        res.render("home", { date: dateIN })
    } else {
        res.send("<h1>PLEASE LOGIN </H1>")
    }

})

app.post('/home', (req, res) => {

    const search = req.body.searchNumber
    if (search === "") {
        SHOP.find({}, (err, foundData) => {
            if (err) {
                res.write("<h1>customer not Found ❌</h1>")
                res.send()
            } else {
                res.render('results', {
                    foundData: foundData, presentDate: dateIN
                })
            }
        })
    } else {
        SHOP.find({ phoneNumber: search }, (err, foundData) => {
            if (err) {
                res.write("<h1>customer not Found ❌</h1>")
                res.send()
            } else {
                res.render('results', {
                    foundData: foundData, presentDate: dateIN
                })
            }
        })

    }
})

app.post("/logout", (req, res) => {
    pass = 0
    res.redirect("/")
})

app.get("/addNew", (req, res) => {
    if (pass === 2000) {
        res.render("addNew", { date: date })
    } else {
        res.send("<h1>PLEASE LOGIN </H1>")
    }

})

app.post("/addNew", (req, res) => {
    const place = req.body.place
    const name = req.body.name
    const fatherName = req.body.fatherName
    const phoneNumber = req.body.phoneNumber
    const amount = req.body.amount
    const takenDate = formatDate(req.body.date)
    const itemName = req.body.itemName
    const rateOfIntrest = req.body.rateOfIntrest
    // const image = (__dirname + req.body.image) //// image


    const customer = new SHOP({
        phoneNumber: phoneNumber,
        details: {
            place: place,
            name: name,
            father: fatherName,
            amount: amount,
            date: takenDate,
            itemName: itemName,
            rateOfIntrest: rateOfIntrest
            // img: image    //// for Image
        }
    })
    customer.save((err) => {

    })
    res.redirect("/home")
})

app.post("/results", (req, res) => {
    const id = req.body._id
    SHOP.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.error(err)
        }
    })
    res.redirect("/home")
})

app.listen(port, () => {
    console.log(" ✅ server started on port : " + port);
})
