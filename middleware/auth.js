import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

// acsta se executa inainte de a se face getul => avem acces la req, res, next (next = ce urmeaza dupa, adica getul)
const auth = (req, res, next) => {
    //get token from header
    //header are usually predefined and predef names 
    const token = req.header('x-auth-token');
    console.log(token);


    if(!token){ //daca nu s-a pus un token in request in ui
        return res.status(401).json({msg : "You are not authorizated to access this resource"});
    }

    try{
        const decoded  = jsonwebtoken.verify(token, process.env.jwtSecret);
        req.user = decoded.user;
        console.log("decoded: ", req.user);
        // next();
    }catch(error){
        console.log(error);
        res.status(400).json({msg : 'Token is invalid'});
    }
     next();
}
export default auth;