import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Campgrounds from '../campgrounds/Campgrounds';
import Campground from '../campgrounds/Campground';
import CampgroundForm from '../campgrounds/CampgroundForm';
import Profile from '../profile/Profile';
import EditProfile from '../profile/EditProfile';
import NotFound from '../layout/NotFound';

const Routes = props => {
	return (
		<section className='container'>
			<Alert />
			<Switch>
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/api/campgrounds' component={Campgrounds} />
				<Route exact path='/api/campgrounds/new' component={CampgroundForm} />
				<Route
					exact
					path='/api/campgrounds/:id/edit'
					component={CampgroundForm}
				/>
				<Route exact path='/api/campgrounds/:id' component={Campground} />
				<Route exact path='/api/profile/me' component={Profile} />
				<Route exact path='/api/profile/:id' component={Profile} />
				<Route exact path='/edit/profile' component={EditProfile} />
				<Route component={NotFound} />
			</Switch>
		</section>
	);
};

export default Routes;
