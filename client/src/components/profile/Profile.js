import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import { getProfileById, deleteAccount } from '../../actions/profile';
import CampgroundCard from '../campgrounds/CampgroundCard';

const Profile = ({
	getProfileById,
	deleteAccount,
	profile: { profile, loading },
	auth,
	match,
}) => {
	useEffect(() => {
		// if path is profile/me then use the auth.user.id for the profile id
		match.path === '/api/profile/me'
			? getProfileById(auth.user._id)
			: getProfileById(match.params.id);
	}, [match]);

	const [deleted, setDeleted] = useState(false);

	const removeAccount = () => {
		deleteAccount();
		setDeleted(!deleted);
	};

	if (deleted) return <Redirect to='/api/campgrounds' />;

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/api/campgrounds/' className='btn btn-light'>
						Back
					</Link>
					<div className='container'>
						<div className='row'>
							<div className='col-md-6 col-lg-4 text-center border-right'>
								<h1>{profile.user.username}</h1>
								<div className='card'>
									<img
										className='card-img-top'
										src={profile.user.avatar}
										alt='user profile image'
									/>
									<div className='card-body'>
										<h3 className='card-title'>About Me</h3>
										<p className='card-text'>{profile.user.name}</p>
										<p className='card-text'>{profile.location}</p>
										<p className='card-text'>{profile.bio}</p>
									</div>
								</div>
								<div>
									{auth.isAuthenticated &&
										!auth.loading &&
										auth.user._id === profile.user._id && (
											<Fragment>
												<Link to='/edit/profile' className='btn btn-dark'>
													Edit Profile
												</Link>
												<button
													className='btn btn-danger'
													onClick={() => removeAccount()}
												>
													Delete Profile
												</button>
											</Fragment>
										)}
								</div>
							</div>

							{/* campgrounds */}
							<div className='col-md-6 col-lg-8 text-center'>
								<h3>My campgrounds</h3>
								<hr />
								<div className='row col-sm-12 m-0 p-0'>
									{profile.campgrounds.map(campground => (
										<CampgroundCard
											key={campground._id}
											campground={campground}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, deleteAccount })(
	Profile,
);
