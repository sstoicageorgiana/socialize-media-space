import express, { response } from 'express';
import {check , validationResult} from 'express-validator'
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

import User from '../models/User.js';


const router = express.Router();


//min 50 - sesiunea 6 explicatie registration

//#region testRoute

// @router          GET API/user
// @description     Test router
// @access          public

router.get(('/'), (req, res) => res.send("Test router for user !"));

//#endregion


//#region  User REGISTRATION

// @router          POST API/user
// @description     Registrer User
// @access          Public 
//Postman           http://localhost:5000/API/user


//verific cu express-validator daca name email password sunt valide, daca nu dau eroare 
router.post('/', 
[
    //CHECK WITH EXPRESS-VALIDATOR THE INPUST
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please use a valid e-mail').isEmail(),
    check('password', 'The password must contain at list 4 characters').isLength({min:4}),
 
], async(req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors}) 
    }else{
        //facem destructaring din body
        const {name, email, password} = req.body;
        console.log(`name: ${name}  email: ${email}  password: ${password}`)
       
        
        try{

            //#region CHECK IF USER ALREADY EXISTS

            let user = await User.findOne({email: email});
            if(user){
                return res
                .status(400)
                .json({ errors: [{msg : 'User exists'}] });
            }
            //#endregion
           
            //get avatar 
            const avatar = gravatar.profile_url(email,{
                s: '200',
                r: 'pg',
                d: 'mm', 
            })
            
            //#region INSTANTIATE USER

            user = new User({
                name : name, 
                email : email, 
                password : password,
                avatar : avatar
            });
            //#endregion

            //#region ENCRYPT/HASH the PASSWORD
            //HIDE THE PASS INTO A HASH
            
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);
            //#endregion 

            //#region SAVE USER IN DB
             
            await user.save();
            //#endregion

            //#region RETURN "TOKANIZE" INFO TO THE USER WITH EXPIRATION DATE

  
            const payload = {
                user: {
                    id: user.id, // user.id is the one from postman
                },
            };

            console.log("process.env.jwtsecret: ", process.env.jwtsecret);
            jsonwebtoken.sign(payload, process.env.jwtSecret, {expiresIn:360000}, (err, token )=> {
                if(err)  throw err;
                return res.json({
                    token : token
                });
            });
            
            //#endregion 
        }catch(error){
                console.log(error);
                res.status(500).send('Server error!');
        }
    }
})


//#endregion




export default router;

/**JAvaDoc
 * 
 *  express.Router() =>  is the package that will create the endpoint
 * 
 * STEP 1
 * create new request with POST Method, Body => Raw=> Json
 * {
 *      "name" :"Stefania"
 * }
 *  STEP 2
 * npm install body-parser
 * import and use it in app.js
 * 
 * npm install gravatar
   npm install bcrypt
   npm install bcryptjs
   npm install config
   npm install jsonwebtoken
 * 
 * communication with the db is async
 * 
 */