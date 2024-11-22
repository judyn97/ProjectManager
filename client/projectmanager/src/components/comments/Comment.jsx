import React, { useState, useEffect } from 'react';
import apiClient, {endpoints} from '../../api';
import './Comment.css'

const Comments = ({ taskId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
      const fetchComments = async () => {
        try {
          const res = await apiClient.get(endpoints.taskComments(taskId));
          setComments(res.data);
        } catch (err) {
          console.error("Error fetching comments", err);
        }
      };
    
      fetchComments();
    }, [taskId]);

    const handleAddComment = () => {
      const userId = 1; // Use the actual logged-in user's ID here
      apiClient.post(endpoints.taskComments(taskId), { userId, commentText: newComment })
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
