import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCampground, editCampground } from '../../actions/campground';

const CampgroundForm = ({
	addCampground,
	editCampground,
	campground: { campground },
}) => {
	useEffect(() => {
		if (campground !== null) {
			setFormData({
				name: campground.name,
				price: campground.price,
				image: campground.image,
				description: campground.description,
			});
		}
	}, [campground]);

	const [formData, setFormData] = useState({
		name: '',
		price: '',
		image: '',
		description: '',
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const { name, price, image, description } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();

		campground !== null
			? await editCampground(campground._id, formData)
			: await addCampground(formData);

		setIsSubmitted(!isSubmitted);
	};

	if (isSubmitted) {
		return <Redirect to='/api/campgrounds' />;
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>
				{campground !== null
					? `Edit ${campground.name}`
					: 'Create a new Campground'}
			</h1>
			<small>* = required field</small>

			<form onSubmit={onSubmit} className='form'>
				<div className='form-group'>
					<small className='form-text'>Campground name</small>
					<input
						type='text'
						placeholder='Falls Peak...'
						name='name'
						value={name}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>Campground price per night</small>
					<input
						type='Number'
						placeholder='9.00'
						name='price'
						value={price}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>Campground Image</small>
					<input
						type='text'
						placeholder='Image URL'
						name='image'
						value={image}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>Campground Description</small>
					<textarea
						type='text'
						placeholder='Such a lovely spot for the whole family'
						name='description'
						value={description}
						onChange={e => onChange(e)}
						required
					/>
				</div>

				<input type='submit' className='btn btn-primary my-1' />
				<Link
					className='btn btn-light my-1'
					to={
						campground !== null
							? `/api/campgrounds/${campground._id}`
							: '/api/campgrounds'
					}
				>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

CampgroundForm.propType = {
	addCampground: PropTypes.func.isRequired,
	editCampground: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	campground: state.campground,
});

export default connect(mapStateToProps, { addCampground, editCampground })(
	CampgroundForm,
);
