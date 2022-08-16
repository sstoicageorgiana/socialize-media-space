# socialize-media-space
MY APP IS RUNNING HERE : https://socialize-app.herokuapp.com/

Some info steps to repoduce this repo are in here :)



Markdown is a plain-text file format. The extensions .md and .markdown are just text files written in Markdown syntax. If you have a Readme.md in your repo, GitHub will show the contents on the home page of your repo. Read the documentation:

● Backend
    ○ Tech stack
        ■ Node JS, Express, MongoDB
    ○ Tools Used
        ■ GitHub, VS Code, Mongoose, bcrypt, config, express-validator, gravatar, jsonwebtoken
    ○ Project structure
        ■ Config
        ■ Middleware
        ■ Models
        ■ API

Tech stack
    NodeJS
    ● open source server environment
    ● runs on different platforms (Windows, Linux, MacOS)
    ● JS syntax to server side applications

    ExpressJS
    ● node.js web application framework
    ● provides a set of features for web application
    ● very flexible - a lot of modules available on npm for Express
    MongoDB

    ● No-SQL database
    ● uses JSON-like documents with optional schemas

Tools
    ● GitHub - Website and cloud-based service for versioning using GIT
    ● VS Code - open-source code editor very intuitive and user friendly
    ● Mongoose - Object Data Modeling for MongoDB and Node.js, manages 
    relationships between data, provide schema validation
    ● bcrypt - a library used to hash passwords
    ● config - used to organize configuration for app development and deployment
    ● express-validator - express JS validator
    ● gravatar - is a service for creating unique avatars
    ● jsonwebtoken - used to manage tokens (www.jwt.io)
    ● postman - used for testing and sending request to APIs

Project structure
    ● Config
        ○ MongoURI, jwtsecret
    ● Middleware
        ○ token based, add token to each request
    ● Models
        ○ User, Profile, Post
    ● API
        ○ /auth, /posts, /profile, /users
MERN!

Project steps as a start => DOCU :

1. 
command to create a npm project : npm init -y =>[ -y = yes], gives default values for all fields => created package.json 

2.
command to install express : npm install express
use express to create endpoints/api/routes
we can now install packages
on this step it will appear in dependences(in package.json)

3.nodemon(node monitor)  
command to install nodemon : npm install nodemon
package with we can see in real time what we implement => is a live server

----------------------------------------------------------------------------
Those above steps/ packages are the initials, just to get started and running the server.

4.Exists 2 ways of working with node, when talking about packages : 
    1.Usual => use "required" syntax
    2.Using React and ES6, and import syntax, i will choose this one, whitch is more familiar. 
        In order to import I put "type":"module", into package.json.

    In section => in package.json i use :
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev":"nodemon app.js"
    },
    =>  "dev":"nodemon app.js" it will run a future file app.js(different notations server.js etc );
        nodemon will start a web server witch will server from app.js; it will strat execution from there

5.  
Creation of app.js
    => listening to a port
    => creating route, giving something to listen to

6. 
Creation of a "db schema", MongoDB with Mongoose
command : npm install mongoose

7.
Had to create on MongoDb.com an free account.
Create a User in section Security => "Database Access"; with this one access in granted db
"Network access" is where we setup from where we have access to the DB ; will give access from everywhere:
    => "Network access" => "Add IP Address" => a modal opens and a btn is to allow access from everywhere
    
8.
"Deployment" => "Database" => "Create db" => free version=> aws, frankfurt => create cluster=> takes some time!
meanwhile created the structure of the project with the export default router

9.
"Deployment" => "Browse Collections" =>"Add my own data " => add name of the db, and the first table 

10.
"Deployment" => "Connect" => "Connect your application"=> 

11.
on server we will have a var in witch we keep the url from step 10, and is not good practice to keep it plain, 
best to hide it , to hide the variable we use .env
command: npm install dotenv
in the "url" we will replace the password and user(if is first db), and  password and user + db name(if in the db are several dbs)

Explenation : dotenv allows you to separate secrets from your source code. 
This is useful in a collaborative environment (e.g., work, or open source) where you may not want
 to share your database login credentials with other people. Instead, you can share the source code 
 while allowing other people to create their own .

 import 'dotenv/config'; into app.js

 12.
 userRegistrationSetep => npm install express-validator(install and import) + npm install body-parser

13.
npm install gravatar
npm install bcrypt
npm install bcryptjs
npm install config
npm install jsonwebtoken


14.
bucrypt => library to hash password
how a pass should be in a db? => "hash-uita"(md5 online tootl, it is used also by git ) 
se aplica algoritm de criptare si rezulta un hash => hash-ul se va pune in db
pentru auth se va introdduce parola, se va gernera hash si se va compara cu ce este in db
https://www.md5hashgenerator.com/ 

What is MD5 Salt and How to Use It?
In cryptography, salt is a random string that you add to an input word, to generate a different hash that with the word alone.
MD5 doesn’t really offer this feature in the cryptographic algorithm, but you can concatenate two strings to get the same result.

15.
authentification => process of login
authorization ====>  access/permision to protected resurces
                     jwt token : open standard that defines process of sending resources secure between parts with json onj(can expire).
                     ex: someone on fb gives you an link with an post from a grup, that you are not part of, and it will say : you are not authorizated to see it because you are not part of that


16. deploy with heroku (keep in mind it can cause error if you do not add the following)  :
 - add variables(var from project, are in file .env) at settings 
 - add lunch command for node in package.json => scripts =>  "start" : "node app.js"

17.modifies : scripts=> from this :
"test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon app.js", 
    "start" : "node app.js"

    to this :

"test": "echo \"Error: no test specified\" && exit 1",
"client": "npm start --prefix client",
"server": "nodemon app.js",
"start" : "node app.js", 
"dev": "concurrently \"npm run server\" \"npm run client\" "

npm run start, need to be started in the folder that is package.json
from scratch, in main folder, run command : npx create-react-app client
// https://martint86.github.io/concurrently/

add in app.js coresponding code for opening the app react int before accesing mongodb(production )

add to package.json
"heroku-postbuild": "npm install --prefix client && npm run build --prefix client"

heroku => does not have nodemodules=>
cd client 
rm -rf node_modules/ => delete node_modules files
npm install 

instaleaza pachetele ca dupa din pachetele pe care le are si codul pe care il scriem creaza un livrabil care este afisat de hiroku
npm run build => va rula react script build 

created client => src => components
npm install react-icons@4.3.1
npm install react-router-dom@5.3.0




            
