export interface iUser{
    id : String,
    name : String,
    username: String,
    password: String,
    email : String,
    avatar : [{String}],
    chat : [{String}],
    dob: Date
}

export class User implements iUser {    
    constructor(public id : String, public name : String, public username: String, public password: String,
        public email : String,public avatar : [{String}],public chat : [{String}],public dob: Date) {

    }
}