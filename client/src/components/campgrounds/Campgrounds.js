import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import CampgroundCard from './CampgroundCard';
import { getCampgrounds } from '../../actions/campground';

const Campgrounds = ({
	getCampgrounds,
	campground: { campgrounds, loading },
	isAuthenticated,
}) => {
	useEffect(() => {
		getCampgrounds();
		// eslint-disable-next-line
	}, [getCampgrounds]);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<header className='jumbotron'>
				<div className='container'>
					<h1>Welcome to YelpCamp</h1>
					<p>View our hand-picked campgrounds from all over the world</p>
					{isAuthenticated && (
						<p>
							<Link
								to='/api/campgrounds/new'
								className='btn btn-primary btn-lg'
							>
								Add New Campground
							</Link>
						</p>
					)}
				</div>
			</header>

			<div className='row text-center col-sm-12 m-0 p-0'>
				{campgrounds.map(campground => (
					<CampgroundCard key={campground._id} campground={campground} />
				))}
			</div>
		</Fragment>
	);
};

Campgrounds.propTypes = {
	getCampgrounds: PropTypes.func.isRequired,
	campground: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	campground: state.campground,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getCampgrounds })(Campgrounds);
