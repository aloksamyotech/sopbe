import {userRegistration} from '../services/example.js'

const example1 = (req, res) => {
    console.log("2 + 2 = 4");
    userRegistration();
    res.send({name:"Deepak"})
}

const example2 = () => {
    console.log("2 + 2 = 4");
    userRegistration();
}

export default {
    example1,
    example2
}