require('../../connection');
const User = require('../../models/User');

async function getUser() {
    const user = await User.findOne({firstName:'Facundo'})
    //console.log(user)
}   

getUser();