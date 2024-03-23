let token = async function(req, res, next){
if(!true){
    res.status(401).send("login eskirdi");
    return;
}

next();    
}

export default token;