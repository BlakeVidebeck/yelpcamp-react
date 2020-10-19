import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = props => {
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-campground'></i> Yelpcamp
				</Link>
			</h1>
			<ul>
				<li>
					<Link to='/register'>Register </Link>
				</li>
				<li>
					<Link to='/login'>Login </Link>
				</li>
			</ul>
		</nav>
	);
};

Navbar.propTypes = {};

export default Navbar;
