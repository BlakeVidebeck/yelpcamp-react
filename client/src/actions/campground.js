import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_CAMPGROUNDS,
	GET_CAMPGROUND,
	CAMPGROUND_ERROR,
	ADD_CAMPGROUND,
	DELETE_CAMPGROUND,
	EDIT_CAMPGROUND,
	ADD_COMMENT,
	DELETE_COMMENT,
} from './types';

// get campgrounds
export const getCampgrounds = () => async dispatch => {
	try {
		const res = await axios.get('/api/campgrounds');

		dispatch({
			type: GET_CAMPGROUNDS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CAMPGROUND_ERROR,
			payload: { msg: err.response, status: err.response.status },
		});
	}
};

// Get Campground
export const getCampground = id => async dispatch => {
	try {
		const res = await axios.get(`/api/campgrounds/${id}`);

		dispatch({
			type: GET_CAMPGROUND,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CAMPGROUND_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// add campground
export const addCampground = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post('/api/campgrounds', formData, config);

		dispatch({
			type: ADD_CAMPGROUND,
			payload: res.data,
		});

		dispatch(setAlert('Campground Added', 'success'));
	} catch (err) {
		dispatch({
			type: CAMPGROUND_ERROR,
			payload: { msg: err.response, status: err.response.status },
		});
	}
};

// edit campground
export const editCampground = (id, formData) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.put(`/api/campgrounds/${id}`, formData, config);

		dispatch({
			type: EDIT_CAMPGROUND,
			payload: res.data,
		});

		dispatch(setAlert('Campground updated!', 'success'));
	} catch (err) {
		dispatch({
			type: CAMPGROUND_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// delete campground
export const deleteCampground = id => async dispatch => {
	try {
		await axios.delete(`/api/campgrounds/${id}`);

		dispatch({
			type: DELETE_CAMPGROUND,
			payload: { id },
		});

		dispatch(setAlert('Campground removed', 'success'));
	} catch (err) {
		dispatch({
			type: CAMPGROUND_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// add comment
export const addComment = (campgroundId, formData) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post(
			`/api/campgrounds/comment/${campgroundId}`,
			formData,
			config,
		);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});
		dispatch(setAlert('Comment Added', 'success'));
	} catch (err) {
		dispatch({
			type: CAMPGROUND_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// delete Comment
export const deleteComment = (campgroundId, commentId) => async dispatch => {
	try {
		console.log(campgroundId, commentId);

		await axios.delete(`/api/campgrounds/comment/${campgroundId}/${commentId}`);

		dispatch({
			type: DELETE_COMMENT,
			payload: commentId,
		});

		dispatch(setAlert('Comment Deleted', 'success'));
	} catch (err) {
		dispatch({
			type: CAMPGROUND_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
