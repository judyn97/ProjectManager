import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comment.css'

const Comments = ({ taskId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // Fetch comments on component mount
    useEffect(() => {
        axios.get(`http://localhost:8800/tasks/${taskId}/comments`)
            .then(res => {
                console.log("taskId",taskId)
                setComments(res.data);
                console.log("comment",res.data)
            })
            .catch(err => {
                console.error("Error fetching comments", err);
            });
    }, [taskId]);

    // Handle new comment submission
    const handleAddComment = () => {
        const userId = 1; // Use the actual logged-in user's ID here
        axios.post(`http://localhost:8800/tasks/${taskId}/comments`, { userId, commentText: newComment })
            .then(res => {
                setComments([...comments, { comment_text: newComment, user_id: userId }]);
                setNewComment(""); // Clear the input field
            })
            .catch(err => {
                console.error("Error adding comment", err);
            });
    };

    return (
        <div className='comment-container'>
            <h3>Comments</h3>
            {/* New comment input */}
            <textarea className='comment-text-input'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
            />
            <div className='comment-button-container'>
                <button className='comment-button' onClick={handleAddComment}>Post</button>
            </div>

            <ul className='comment-section-container'>
                {comments.map((comment, index) => (
                    <li className='comment-list-container' key={index}>
                        <p>{comment.comment_text}</p>
                        <span className='user-date-text'>Posted by User {comment.user_id} on {new Date(comment.created_at).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
