import express, { response } from 'express';
import {check , validationResult} from 'express-validator'
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';


import User from '../models/User.js';
import auth from '../middleware/auth.js'


const router = express.Router();

//#region TEST Router

// @route         GET  api/auth
// @description   TEST route 
// @access        Public
// Postman        Request : http://localhost:5000/API/auth

//router.get('/',(req, res) => res.send('Test auth route 1'));
//#endregion


//#region TEST Router Just for Users that are Auth

// @route         GET  api/auth
// @description   Middleware auth 
// @access        Public
// Postman        Request : http://localhost:5000/API/auth

// Middleware => ceva ce se executa pe masura ce se intampla

router.get('/', auth, (req, res) => res.send('Test auth route 2'));
//#endregion


//#region LoginIN

//@route            POST api/auth
//@description      loginin registerd user  
//@access           Public


router.post('/', 
[

    check('email', 'Please use a valid e-mail').isEmail(),
    check('password', 'The password must contain at list 4 characters').isLength({min:4}),
], async(req, res) => {
    console.log(req.body);  
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors}) 
    }

    const{email, password} = req.body;

    try{
        let user = await User.findOne({email : email});
        if(!user){
            return res.status(400).json({errors: "User do not exist"})
        } 
        

        //compare plain text with hash 
        const idValidPassword = await bcryptjs.compare(password, user.password) ;
        console.log( `Pass is valid : ${idValidPassword}`);
        if(!idValidPassword){
            return res.status(400).json({errors: "Password is not correct"})
        } 
        
        //la login trebuie sa dam token-ul
        //imi doresc ca raspumsul pe care o sa il folosesc in ui candva sa contina tokenul 
        const payload = {
            user: {
                id: user.id, 
            },
        };

        jsonwebtoken.sign(payload, process.env.jwtSecret, {expiresIn:360000}, (err, token )=> {
            if(err)  throw err;
            return res.json({
                token : token
            });
        });
        
    }
    catch(error){

    }
   





})

//#endregion


export default router;

/**JAvaDoc
 * 
 *  express.Router() =>  is the package that will create the endpoint
 * 
 * export default router 
 *      => when using export default it will take the exported object
 *      => when the router is imported it can be imported with the same name or a different name
 */



 