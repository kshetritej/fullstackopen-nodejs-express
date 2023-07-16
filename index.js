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

app.get('/', (req, res)=>{
    res.send("<h1> Hello  please visit localhost:3001/api/persons for the list</h1>")
})
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})