const express = require('express')
const morgan = require('morgan')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))
app.use(express.json())
morgan.token('type', function (req, res) { return JSON.stringify(persons[persons.length -1 ]) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))


let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456', 
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-53525252',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-25252',
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-23-5252',
    }
]

const date = new Date()

// root directory (localhost:3001)
// app.get('/', (req, res) => {
//     res.json()
// })

//for displaying all results
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

//for displaying info page
app.get('/info', (req, res) => {
    res.send(` <p>Phonebook has info for ${persons.length} people <br/> ${date}</p>`)
})

//For displaying single phonebook entry
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    }
    res.status(404).end()
})

//For deleting data 
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

//for posting data
app.post('/api/persons', (req, res) => {
    const body = req.body

    const person = {
        id: Math.floor((Math.random() * 10)),
        name: "Hell's Kitchen",
        number: "080580285"
    }
    if (!person.name) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    
    const findName = persons.map(person => person.name)
    if(findName.includes(person.name)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})