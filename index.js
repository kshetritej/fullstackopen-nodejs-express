const express = require('express')
const app = express ()

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
app.get('/', (req, res)=>{
    res.send("<h1> Hello  please visit localhost:3001/api/persons for the list</h1>")
})
//for displaying all results
app.get('/api/persons', (req, res) => {
    res.json(persons)
})
//for displaying info page
app.get('/info', (req,res) => {
    res.send(` <p>Phonebook has info for ${persons.length} people <br/> ${date}</p>`)
})
//For displaying single phonebook entry
app.get('/api/persons/:id',(req, res) =>{
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})