const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user'
			}
		}
	],
	// model for one comment in an array of comments
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user'
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Campground = mongoose.model('campground', CampgroundSchema);
