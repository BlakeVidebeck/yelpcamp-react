import React, { Fragment, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Comment from '../comment/Comment';
import CommentForm from '../comment/CommentForm';
import { getCampground, deleteCampground } from '../../actions/campground';

const Campground = ({
	getCampground,
	campground: { campground, loading },
	auth,
	match,
	deleteCampground,
}) => {
	useEffect(() => {
		getCampground(match.params.id);
	}, [getCampground]);

	const [removed, setRemoved] = useState(false);

	const removeCampground = async e => {
		await deleteCampground(campground._id);
		setRemoved(!removed);
	};

	if (removed) {
		return <Redirect to='/api/campgrounds' />;
	}

	// need this if statement as when the page first loads, it returns null
	// so the page breaks
	return loading || campground === null ? (
		<Spinner />
	) : (
		<Fragment>
			<div className='col-sm-12 col-lg-9 mx-auto p-0'>
				<div className='card mb-3'>
					<img className='card-img-top' src={campground.image} alt='' />
					<div className='card-body'>
						<h4 className='float-right'>${campground.price}/night</h4>
						<h4 className='card-title'>{campground.name}</h4>
						<p className='card-text'>{campground.description}</p>
						<p className='card-text w-50 d-inline-block'>
							<em>Submitted By: {campground.author}</em>
						</p>

						<div className='float-right d-inline-block'>
							{!loading &&
								auth.user !== null &&
								campground.user === auth.user._id && (
									<Fragment>
										{/* Edit button */}
										<Link
											className='btn btn-sm btn-primary'
											to={`/api/campgrounds/${campground._id}/edit`}
										>
											Edit
										</Link>
										{/* delete button */}
										<button
											className='btn btn-sm btn-danger'
											onClick={removeCampground}
										>
											Delete
										</button>
									</Fragment>
								)}
						</div>
					</div>
				</div>
			</div>

			{/* comments */}
			<div className='card col-sm-12 col-lg-9 mx-auto p-0'>
				{!loading && auth.user !== null && (
					<Fragment>
						<div className='card-header'>Add Comment</div>
						<CommentForm campgroundId={campground._id} />
					</Fragment>
				)}
				<div className='card-header'>Comments</div>
				{campground.comments.map(comment => (
					<Comment
						key={comment._id}
						comment={comment}
						campgroundId={campground._id}
					/>
				))}
			</div>
		</Fragment>
	);
};

Campground.propTypes = {
	getCampground: PropTypes.func.isRequired,
	campground: PropTypes.object.isRequired,
	deleteCampground: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	campground: state.campground,
	auth: state.auth,
});

export default connect(mapStateToProps, { getCampground, deleteCampground })(
	Campground,
);
