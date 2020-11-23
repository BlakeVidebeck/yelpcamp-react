import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/campground';

const Comment = ({
	campgroundId,
	comment: { _id, user, text, name, avatar, date },
	auth,
	deleteComment,
}) => {
	return (
		<>
			<div className='card'>
				<div className='ml-1 mt-2'>
					<div className='card-title'>
						<Link to={`/users/${user}`}>
							<img className='comment-thumbnail mr-1' src={avatar} alt='' />
							<strong>{name}</strong>
						</Link>
					</div>
					<p className='my-1 card-text'>{text}</p>
					{!auth.loading && auth.user !== null && user === auth.user._id && (
						<button
							onClick={e => deleteComment(campgroundId, _id)}
							type='button'
							className='btn btn-danger'
						>
							<i className='fas fa-times'></i>
						</button>
					)}
				</div>
			</div>
		</>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
