const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Campground = require('../../models/Campground');
const User = require('../../models/User');

// @route   POST api/campgrounds
// @desc    Create a campground
// @access  Private
router.post(
	'/',
	auth,
	[
		body('name', 'Campground name is required').not().isEmpty(),
		body('price', 'Campground price is required').not().isEmpty(),
		body('image', 'Campground image is required').not().isEmpty(),
		body('description', 'Campground description is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, price, image, description } = req.body;

		try {
			const profile = await Profile.findOne({
				user: req.user.id
			});

			let campground = new Campground({
				user: req.user.id,
				name,
				price,
				image,
				description
			});

			// add campground to user profile
			profile.campgrounds.unshift(campground);

			await campground.save();
			await profile.save();
			res.json(campground);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   GET api/campgrounds
// @desc    Get all campground
// @access  Public
router.get('/', async (req, res) => {
	try {
		const campgrounds = await Campground.find().sort({ date: -1 });
		res.json(campgrounds);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/campgrounds/:id
// @desc    Get campground by ID
// @access  Public
router.get('/:id', async (req, res) => {
	try {
		const campground = await Campground.findById(req.params.id);

		if (!campground) {
			return res.status(404).json({ msg: 'Campground not found' });
		}

		res.json(campground);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Campground not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/campgrounds/:id
// @desc    Update campground by ID
// @access  Private
router.put('/:id', auth, async (req, res) => {
	try {
		const campground = await Campground.findById(req.params.id);

		if (!campground) {
			return res.status(404).json({ msg: 'Campground not found' });
		}

		const { name, price, image, description } = req.body;

		if (name) campground.name = name;
		if (price) campground.price = price;
		if (image) campground.image = image;
		if (description) campground.description = description;

		campground.save();
		return res.json(campground);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Campground not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/campgrounds/:id
// @desc    Delete a campground
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const campground = await Campground.findById(req.params.id);
		const profile = await Profile.findOne({
			user: req.user.id
		});

		if (!campground) {
			return res.status(404).json({ msg: 'Campground not found' });
		}

		// Check campground ownership
		if (campground.user.id.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		// remove campground from user profile
		const removeIndex = profile.campgrounds
			.map(campground => campground.id.toString())
			.indexOf(req.params.id);
		profile.campgrounds.splice(removeIndex, 1);
		await profile.save();

		await campground.remove();
		res.json({ msg: 'Campground removed' });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/campgrounds/like/:id
// @desc    Like a campground
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const campground = await Campground.findById(req.params.id);

		// Check if post has already been liked by the user
		if (campground.likes.some(like => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: 'Campground already liked' });
		}

		campground.likes.unshift({ user: req.user.id });

		await campground.save();

		return res.json(campground.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/campgrounds/unlike/:id
// @desc    unlike a campground
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const campground = await Campground.findById(req.params.id);

		// Check if post has already been liked by the user
		if (!campground.likes.some(like => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: 'Campground has not been liked' });
		}

		const removeIndex = campground.likes
			.map(like => like.user.toString())
			.indexOf(req.user.id);

		campground.likes.splice(removeIndex, 1);

		await campground.save();

		return res.json(campground.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/campgrounds/comment/:id
// @desc    Create a Comment on a campground
// @access  Private
router.post(
	'/comment/:id',
	[auth, [body('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const campground = await Campground.findById(req.params.id);

			const newComment = {
				user: req.user.id,
				text: req.body.text,
				name: user.name,
				avatar: user.avatar
			};

			campground.comments.unshift(newComment);

			await campground.save();

			res.json(campground.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   Delete api/campgrounds/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const campground = await Campground.findById(req.params.id);

		// Pull out comment
		const comment = campground.comments.find(
			comment => comment.id === req.params.comment_id
		);

		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		// Check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User is not authorized' });
		}

		// Get remove index
		const removeIndex = campground.comments
			.map(comment => comment.user.toString())
			.indexOf(req.user.id);

		campground.comments.splice(removeIndex, 1);

		await campground.save();

		res.json(campground.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
