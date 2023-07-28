const express = require('express')
const morgan = require('morgan')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))
app.use(express.json())
morgan.token('type', function (req, res) { return JSON.stringify(persons[persons.length -1 ]) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

//mongoose definations
const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://kshetritej:${password}@cluster0.yg8tfaf.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    id: Number,
    name : String,
    number: String,
})

const Phonebook = mongoose.model('Contact',phonebookSchema)

app.get('/api/persons', (req,res) => {
    Person.find({}).then(person =>{
        res.json(persons)
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})