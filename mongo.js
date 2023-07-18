const mongoose = require ('mongoose')

if(process.argv.length < 3){
    console.log('password too short')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kshetritej:<password>@cluster0.yg8tfaf.mongodb.net/Phonebook?retryWrites=true&w=majority`

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
    id: 10,
    name: 'Tejendra Gc',
    number:'98280852',
})

phonebook.save().then(result => {
    console.log(phonebook)
    console.log('contact saved!')
    mongoose.connection.close()
})

//for listing entries of the phonebook
Phonebook.find({}).then(res => {
    res.forEach(phonebook =>{
        console.log(phonebook)
    })
    mongoose.connection.close()
})