import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import campground from './campground';
import profile from './profile';

export default combineReducers({
	alert,
	auth,
	campground,
	profile,
});
