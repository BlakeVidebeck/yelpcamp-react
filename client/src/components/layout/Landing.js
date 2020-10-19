import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Landing = props => {
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Yelpcamp</h1>
					<p className='lead'>
						Register to be able to create and view campgrounds from around the
						world
					</p>
					<div className='buttons'>
						<Link to='/register' className='btn btn-primary'>
							Sign Up
						</Link>
						<Link to='/login' className='btn btn-light'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {};

export default Landing;
