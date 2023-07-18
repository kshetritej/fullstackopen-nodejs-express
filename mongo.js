const mongoose = require ('mongoose')

if(process.argv.length < 3){
    console.log('password too short')
    process.exit(1)
}

const password = process.argv[2]
const id = process.argv[3]
const name = process.argv[4]
const number = process.argv[5]

const url = `mongodb+srv://kshetritej:${password}@cluster0.yg8tfaf.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

// for adding entries to the phonebook
const phonebook = new Phonebook({
    id: id,
    name: name,
    number:number,
})

phonebook.save().then(result => {
    console.log(phonebook)
    console.log('contact saved!')
    mongoose.connection.close()
})

//for listing entries of the phonebook
Phonebook.find({}).then(res => {
    console.log(`Phonebook Entries:`)
    res.forEach(phonebook =>{
        console.log(phonebook.name, phonebook.number)
    })
    mongoose.connection.close()
})