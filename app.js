global.db = require('./db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

//definir rotas

const router = express.Router()
router.get('/', (req, res) => res.json({ message: 'Work It!'}))
app.use('/', router)

//GET/clientes
router.get('/clientes', (req, res) => global.db.findCustomers((err, docs) =>{
    if(err) res.status(500).json(err)
    else res.json(docs)
}))

//GET/clientes/{id}
router.get('/clientes/:id', (req, res) => 
global.db.findCustomer(req.params.id, (err, doc) =>{
    if(err) res.status(500).json(err)
    else res.json(doc)
}))

//POST/clientes
router.post('/clientes', (req, res) =>{
    const customer = req.body
    global.db.insertCustomer(customer, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: "Cliente cadastrado com sucesso!"})
    })
})

//PUT/clientes/{id}
router.put('/clientes/:id', (req, res) => {
    const id = req.params.id
    const customer = req.body
    global.db.updateCustomer(id, customer, (err, result) => {
        if(err) res.status(500).json(err)
        else res.jason({ message: "Cliente atualizado com sucesso!"})
    })
})

//PATCH/clientes/{id}
router.patch('/clientes/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    global.db.patchCustomer(id, updates, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente atualizado com sucesso!'})
    })
})

//DELETE/clientes/{id}
router.delete('/clientes/:id', (req, res) => {
    const id = req.params.id
    global.db.deleteCustomer(id, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente excluido com sucesso!'})
    })
})

//inicia servidor
app.listen(port)
console.log('API work it!')