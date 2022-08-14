import express, { response } from 'express';
import {check , validationResult} from 'express-validator'
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';


import User from '../models/User.js';
import auth from '../middleware/auth.js'
import Post from '../models/post.js';


const router = express.Router();


//#region =>>  MAKE A POST

// @route               POST API/posts
// @description         Create a new Post 
// @access              private - only auth users cand add new posts 
// Postman              Request : http://localhost:5000/API/posts

//auth => sa avem token adica  sa fim logati
router.post('/', [auth,
    [
        check('text', 'Post content required').not().isEmpty()
    ]

],async(req,res) =>{
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}) 
    }
    try{
    const user = await User.findById(req.user.id);
    
    const post = new Post({
        text : req.body.text,
        name :user.name,
        avatar : user.avatar,
        user: req.user.id
        });
        
    console.log("post = ", post);
    const newPost = await post.save();
    res.status(201).json({post:newPost});
    }catch(error){
        console.log(error);
    }

});
//#endregion


//#region 

// @route         GET api/posts
// @description   Fetch all posts
// @access        Private - only logged in users can see all posts from all users

router.get('/', async (request, response) => {
	// sort the post desceding by added date
	try {
		const posts = await Post.find().sort({ date: -1 }); //SA LE SORTEZE IN ORDINE DESCRESCATOARE A DATEI POSTATE
		response.json(posts);
	} catch (error) {
		console.error(error.message);
		response.status(500).send('Server error');
	}
});
//#endregion



// @route         GET api/posts/:id
// @description   Get post by id
// @access        Private - only logged in users can see all posts from all users
router.get('/:post_id', auth, async (request, response) => {
	// sort the post desceding by added date
	try {
		const post = await Post.findById(request.params.post_id);

		if (!post) {
			return response.status(404).json({ msg: 'Post not found' });
		}

		response.json(post);
	} catch (error) {
		console.error(error.message);
		// check if the id is in correct format
		if (error.kind == 'ObjectId') {
			return response.status(404).json({ msg: 'Post not found' });
		}
		response.status(500).send('Server error');
	}
});

// @route         PUT api/posts/:id
// @description   PUT post by id
// @access        Private
router.put(
	'/:post_id',
	[
		auth,
		[
			check('title', 'Post title is required').not().isEmpty(),
			check('text', 'Post content is required').not().isEmpty(),
		],
	],
	async (request, response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(request.user.id).select('-password');
			const post = await Post.findById(request.params.post_id);

			// check if the user that edit the post is the owner
			// post.user is not of type string, but ObjectId
			if (post.user.toString() !== request.user.id) {
				return response
					.status(401)
					.json({ msg: 'User not authorized to edit the post' });
			}

			if (!post) {
				return response.status(404).json({ msg: 'Post not found' });
			}

			post.title = request.body.title;
			post.text = request.body.text;
			post.date = Date.now();
			await post.save();

			response.json(post);
		} catch (error) {
			console.error(error.message);
			// check if the id is in correct format
			if (error.kind == 'ObjectId') {
				return response.status(404).json({ msg: 'Post not found' });
			}
			response.status(500).send('Server error');
		}
	}
);


// @route         DELETE api/posts/:id
// @description   Delete post by id
// @access        Private - only logged in users can see all posts from all users
router.delete('/:post_id', auth, async (request, response) => {
	// sort the post desceding by added date
	try {
		const post = await Post.findById(request.params.post_id);

		// check if the user that delete the post is the owner
		// post.user is not of type string, but ObjectId
		if (post.user.toString() !== request.user.id) {
			return response
				.status(401)
				.json({ msg: 'User not authorized to delete the post' });
		}

		await post.remove();

		response.json({ msg: 'Post removed' });
	} catch (error) {
		console.error(error.message);
		// check if the id is in correct format
		if (error.kind == 'ObjectId') {
			return response.status(404).json({ msg: 'Post not found' });
		}
		response.status(500).send('Server error');
	}
});

// @route         PUT api/posts/like/:id
// @description   Like a post
// @access        Private
router.put('/like/:post_id', auth, async (request, response) => {
	try {
		const post = await Post.findById(request.params.post_id);
		// a user can like only once a post
		if (
			post.likes.filter((like) => like.user.toString() == request.user.id)
				.length > 0
		) {
			return response.status(400).json({ msg: 'Post already liked' });
		}

		post.likes.unshift({ user: request.user.id });
		await post.save();

		return response.json(post.likes);
	} catch (error) {
		console.error(error.message);
		response.status(500).send('Server error');
	}
});

// @route         PUT api/posts/unlike/:id
// @description   Like a post
// @access        Private
router.put('/unlike/:post_id', auth, async (request, response) => {
	try {
		const post = await Post.findById(request.params.post_id);
		// a user can like only once a post
		if (
			post.likes.filter((like) => like.user.toString() == request.user.id)
				.length === 0
		) {
			return response.status(400).json({ msg: 'Post has not been liked yet' });
		}

		// get the remove index
		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(request.user.id);

		post.likes.splice(removeIndex, 1);

		await post.save();

		return response.json(post.likes);
	} catch (error) {
		console.error(error.message);
		response.status(500).send('Server error');
	}
});

// @route         POST api/posts/comments/:post_id
// @description   Create a comment
// @access        Private - only logged in user could add a new post
router.post(
	'/comments/:post_id',
	[auth, [check('text', 'Comment content is required').not().isEmpty()]],
	async (request, response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(request.user.id).select('-password');
			const post = await Post.findById(request.params.post_id);
			const newComment = {
				text: request.body.text,
				name: user.name,
				avatar: user.avatar,
				user: request.user.id,
			};

			post.comments.unshift(newComment);
			await post.save();

			response.json(post.comments);
		} catch (error) {
			console.error(error.message);
			response.status(500).send('');
		}
	}
);

// @route         POST api/posts/comments/:post_id/:comment_id
// @description   Create a comment
// @access        Private - only logged in user could add a new post
router.delete(
	'/comments/:post_id/:comment_id',
	auth,
	async (request, response) => {
		try {
			const post = await Post.findById(request.params.post_id);

			// get the comment from the post
			const comment = post.comments.find(
				(comment) => comment.id === request.params.comment_id
			);

			if (!comment) {
				return response.status(404).json({ msg: 'Comment does not exists' });
			}

			// check user that deletes the comment is the owner
			if (comment.user.toString() !== request.user.id) {
				return response
					.status(401)
					.json({ msg: 'User is not authorized to delete the comment' });
			}

			// get the remove index
			const removeIndex = post.comments
				.map((comment) => comment.user.toString())
				.indexOf(request.user.id);

			post.comments.splice(removeIndex, 1);

			await post.save();

			return response.json(post.comments);
		} catch (error) {
			console.error(error.message);
			response.status(500).send('Server error');
		}
	}
);




export default router ;


/**JAvaDoc
 * 
 *  express.Router() =>  is the package that will create the endpoint
 * 
 */