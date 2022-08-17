import express from 'express';
import authRouter from './API/auth.js';
import postsRouter from './API/posts.js';
import userRouter from './API/users.js';

import 'dotenv/config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();

app.use(bodyParser.json());

//#region Routes
// app.get('/', (req, res)=> res.send('Success! Social media app hosted!')); 
app.use('/api/auth', authRouter);                              
app.use('/api/posts',postsRouter);
app.use('/api/users', userRouter);
//#endregion


//#region ListeningToPort
app.listen(process.env.PORT ||5000) 
//#endregion


//#region Connect to MongoDB

// process.env.NODE_ENV  it is set up by mongodb
//what we want to deploy => frontend 
if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));
	app.get( '*', (req, res) => {
		req.sendFile(path.resolve(__dirname, 'build', 'index.html'))
	});
} 
//react are script care se numeste build => npm run build=> se creaza un folder build cu codul minificat intr-un fisier index.html
//remeber: react build duce intr-un folder build, un fisier index.html care va fi pct care deschide app
//trebui sa ii spunem cum sa faca build


const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected!!');
	} catch (err) {
		console.log('Failed to connect to MongoDB', err);
	}
};
connectDB();
//#endregion

