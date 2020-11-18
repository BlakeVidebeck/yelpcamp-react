import React, { useState, useEffect } from 'react';
import CampgroundCard from './CampgroundCard';

const Campgrounds = () => {
	const [campgrounds, setCampgrounds] = useState([]);
	useEffect(() => {
		setCampgrounds(arr);
		// eslint-disable-next-line
	}, []);

	const arr = [
		{
			id: 1,
			name: 'Swallow falls',
			price: '9.00',
			description: 'Such a beutiful place!',
			author: 'Blake',
			image:
				'https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png',
		},
		{
			id: 2,
			name: 'Fugly falls',
			price: '11.00',
			description: 'Such a pretty place!',
			author: 'John',
			image:
				'https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png',
		},
	];
	return (
		<div>
			<header className='jumbotron'>
				<div className='container'>
					<h1>Welcome to YelpCamp</h1>
					<p>View our hand-picked campgrounds from all over the world</p>
					<p>
						<a className='btn btn-primary btn-lg' href='/campgrounds/new'>
							Add New Campground
						</a>
					</p>
				</div>
			</header>

			<div className='row text-center col-sm-12 m-0 p-0'>
				{campgrounds.map((campground, index) => (
					<CampgroundCard key={index} campground={campground} />
				))}
			</div>
		</div>
	);
};

export default Campgrounds;
