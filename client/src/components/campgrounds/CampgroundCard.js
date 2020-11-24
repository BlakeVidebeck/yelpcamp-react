import React from 'react';
import { Link } from 'react-router-dom';

const CampgroundCard = ({ campground: { _id, name, description, image } }) => {
	return (
		<div className='col-md-6 col-lg-4'>
			<div className='card'>
				<img className='card-img-top' src={image} alt='' />
				<div className='card-body'>
					<h4 className='card-title'>{name}</h4>
					<p className='card-text text-truncate'>{description}</p>
				</div>
				<p>
					<Link to={`/api/campgrounds/${_id}`} className='btn btn-primary'>
						More Info
					</Link>
				</p>
			</div>
		</div>
	);
};

export default CampgroundCard;
