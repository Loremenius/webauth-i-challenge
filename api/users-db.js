const db = require('../data/dbConfig');

module.exports={
    find,
    createUser,
    findByName
    
}

function find(){
    return db('users');
}

function findByName(username){
    return db('users')
        .select('*')
        .where('username', username)
        .first();
}

function createUser(user){
    return db('users').insert({...user}, "*");
}
