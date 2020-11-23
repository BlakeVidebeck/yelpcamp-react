import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Campgrounds from '../campgrounds/Campgrounds';
import Campground from '../campgrounds/Campground';
import CampgroundForm from '../campgrounds/CampgroundForm';

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
			</Switch>
		</section>
	);
};

export default Routes;
