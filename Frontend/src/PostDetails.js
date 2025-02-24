import React, { useState } from 'react';

function PostDetails({ post }) {
  const [comments, setComments] = useState(post.comments ?? []);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        text: newComment,
        commenter: 'Admin',
        replies: []
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };

  const handleReply = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId && replyText.trim()) {
        const newReply = {
          id: comment.replies.length + 1,
          text: replyText,
          commenter: 'Admin'
        };
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      return comment;
    });
    setComments(updatedComments);
    setReplyingTo(null);
    setReplyText('');
  };

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <div className="comments-section">
        <h3>Comments</h3>
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          ></textarea>
          <button onClick={handleAddComment}>Comment</button>
        </div>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p><strong>{comment.commenter}</strong>: {comment.text}</p>
              <button onClick={() => setReplyingTo(comment.id)}>Reply</button>

              {replyingTo === comment.id && (
                <div className="reply-box">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                  ></textarea>
                  <button onClick={() => handleReply(comment.id)}>Reply</button>
                </div>
              )}

              {comment.replies.length > 0 && (
                <div className="replies">
                  {comment.replies.map((reply) => (
                    <p key={reply.id}><strong>{reply.commenter}</strong>: {reply.text}</p>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
