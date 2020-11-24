import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, updateProfile } from '../../actions/profile';

const EditProfile = ({
	profile: { profile, loading },
	getCurrentProfile,
	updateProfile,
}) => {
	const [formData, setFormData] = useState({
		name: '',
		avatar: '',
		bio: '',
		location: '',
	});

	useEffect(() => {
		getCurrentProfile();

		setFormData({
			name: loading || !profile.user.name ? '' : profile.user.name,
			avatar: loading || !profile.user.avatar ? '' : profile.user.avatar,
			bio: loading || !profile.bio ? '' : profile.bio,
			location: loading || !profile.location ? '' : profile.location,
		});
	}, [loading, getCurrentProfile]);

	const { name, avatar, bio, location } = formData;
	const [updated, setUpdated] = useState(false);

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async e => {
		e.preventDefault();
		await updateProfile(formData);
		setUpdated(!updated);
	};

	if (updated) {
		return <Redirect to={`/api/profile/me`} />;
	}

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-6 col-lg-4 mt-25px mx-auto'>
					<h1>Edit Profile</h1>
					<form onSubmit={onSubmit}>
						<div className='form-group'>
							<input
								className='form-control form-control-sm'
								type='text'
								name='name'
								value={name}
								placeholder={name ? name : 'Name'}
								onChange={e => onChange(e)}
							/>
						</div>
						<div className='form-group'>
							<input
								className='form-control form-control-sm'
								type='text'
								name='avatar'
								value={avatar}
								placeholder={avatar ? avatar : 'Avatar Url'}
								onChange={e => onChange(e)}
							/>
						</div>
						<div className='form-group'>
							<input
								className='form-control form-control-sm'
								type='text'
								name='location'
								value={location}
								placeholder={location ? location : 'location'}
								onChange={e => onChange(e)}
							/>
						</div>
						<div className='form-group'>
							<textarea
								className='form-control form-control-sm'
								name='bio'
								cols='5'
								rows='5'
								value={bio}
								placeholder={bio ? bio : 'Tell us about yourself'}
								onChange={e => onChange(e)}
							></textarea>
						</div>

						<div className='form-group'>
							<button className='btn btn-primary btn-block'>
								Update profile!
							</button>
						</div>
					</form>

					<Link to={`/api/profile/me`}>Go Back</Link>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, updateProfile })(
	EditProfile,
);
