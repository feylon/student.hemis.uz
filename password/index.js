import * as bcrypt from "bcrypt";

const password_generate = async function (password){
const saltrounds = 10;
const salt = await bcrypt.genSalt(saltrounds);

const hash = await bcrypt.hash(password, salt);
return hash;
}

const password_checker = async function(password, hash){
    const check = await bcrypt.compare(password, hash);
    return check;
}


export {password_checker, password_generate};