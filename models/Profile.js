const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	location: {
		type: String,
	},
	bio: {
		type: String,
	},
	campgrounds: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'campground',
			},
			username: {
				type: String,
			},
			image: {
				type: String,
			},
			description: {
				type: String,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
