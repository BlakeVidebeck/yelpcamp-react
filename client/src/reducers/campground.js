import {
	GET_CAMPGROUNDS,
	GET_CAMPGROUND,
	CAMPGROUND_ERROR,
	ADD_CAMPGROUND,
	DELETE_CAMPGROUND,
	EDIT_CAMPGROUND,
	ADD_COMMENT,
	DELETE_COMMENT,
} from '../actions/types';

const initialState = {
	campgrounds: [],
	campground: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_CAMPGROUNDS:
			return {
				...state,
				campgrounds: payload,
				campground: null,
				loading: false,
			};
		case GET_CAMPGROUND:
			return {
				...state,
				campground: payload,
				loading: false,
			};
		case ADD_CAMPGROUND:
			return {
				...state,
				campgrounds: [payload, ...state.campgrounds],
				loading: false,
			};
		case EDIT_CAMPGROUND:
			return {
				...state,
				campground: payload,
				loading: false,
			};
		case DELETE_CAMPGROUND:
			return {
				...state,
				campgrounds: state.campgrounds.filter(
					campground => campground._id !== payload,
				),
				loading: false,
			};
		case ADD_COMMENT:
			return {
				...state,
				campground: {
					...state.campground,
					comments: payload,
				},
				loading: false,
			};
		case DELETE_COMMENT:
			return {
				...state,
				campground: {
					...state.campground,
					comments: state.campground.comments.filter(
						comment => comment._id !== payload,
					),
				},
				loading: false,
			};
		case CAMPGROUND_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
}
