const mongoClient = require("mongodb").MongoClient
mongoClient.connect("mongodb://localhost/workshop")
.then(conn => global.conn = conn.db("workshop"))
.catch(err => console.log(err))

function findCustomers(callback){
    global.conn.collection('custumers').find().toArray(
        callback
    )
}

const ObjecId = require("mongodb").ObjectId
function findCustomer(id, callback){
    global.conn.collection('custumers')
    .findOne(new ObjecId(id),callback)
}

function insertCustomer(customer, callback){
    global.conn.collection('custumers').insert(customer, callback)
}

function updateCustomer(id, customer, callback){
    global.conn.collection('custumers').update({
        _id:new ObjecId(id)}, customer, callback)
}

function patchCustomer(id, updates, callback){
    global.conn.collection('custumers').updateMany({_id: 
        new ObjecId(id)},{ $set: updates }, callback)
}

function deleteCustomer(id,callback){
    global.conn.collection('custumers').deleteOne({_id: new ObjecId(id)}, callback)
}

module.exports = {findCustomers, findCustomer, insertCustomer, updateCustomer, patchCustomer, deleteCustomer}