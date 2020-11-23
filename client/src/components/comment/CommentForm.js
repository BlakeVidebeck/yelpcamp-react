import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/campground';

const CommentForm = ({ campgroundId, addComment }) => {
	const [text, setText] = useState('');

	const onSubmit = e => {
		e.preventDefault();
		addComment(campgroundId, { text });
		setText('');
	};

	return (
		<div>
			<form className='form-inline my-1' onSubmit={onSubmit}>
				<input
					className='form-control comment-form mr-1'
					type='text'
					name='text'
					placeholder='Create a new comment'
					onChange={e => setText(e.target.value)}
					value={text}
					required
				/>
				<input type='submit' class='btn btn-dark' value='Submit' />
			</form>
		</div>
	);
};

export default connect(null, { addComment })(CommentForm);
