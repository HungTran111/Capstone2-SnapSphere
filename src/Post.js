import React, { useEffect, useState } from 'react';
import './Post.css';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedCaption, setEditedCaption] = useState(caption);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [editableComment, setEditableComment] = useState({ id: '', text: '' });

  useEffect(() => {
    let unsubscribeComments;
    if (postId) {
      unsubscribeComments = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        });
    }

    let unsubscribeLikes;
    if (postId) {
      unsubscribeLikes = db.collection('posts').doc(postId).collection('likes').onSnapshot((snapshot) => {
        setLikes(snapshot.docs.map((doc) => doc.id));
      });
    }

    return () => {
      if (unsubscribeComments) {
        unsubscribeComments();
      }
      if (unsubscribeLikes) {
        unsubscribeLikes();
      }
    };
  }, [postId]);

  useEffect(() => {
    if (user && likes.includes(user.uid)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setComment('');
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    db.collection('posts').doc(postId).update({
      caption: editedCaption,
    });

    setEditMode(false);
  };

  const handleDelete = (commentId) => {
    db.collection('posts').doc(postId).collection('comments').doc(commentId).delete();
  };

  const handleLike = () => {
    if (user) {
      if (liked) {
        db.collection('posts').doc(postId).collection('likes').doc(user.uid).delete();
      } else {
        db.collection('posts').doc(postId).collection('likes').doc(user.uid).set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    }
  };

  const handleEditComment = (commentId, commentText) => {
    setEditableComment({ id: commentId, text: commentText });
  };

  const saveEditedComment = () => {
    if (editableComment.id && editableComment.text.trim() !== '') {
      db.collection('posts')
        .doc(postId)
        .collection('comments')
        .doc(editableComment.id)
        .update({
          text: editableComment.text,
        });

      setEditableComment({ id: '', text: '' });
    }
  };

  const cancelEditComment = () => {
    setEditableComment({ id: '', text: '' });
  };

  return (
    <div className='post'>
      <div className='post__header'>
        <div className='left__side'>
          <Avatar className='post__avatar' alt={username} src='/static/images/avatar/1.jpg' />
          <h3>{username}</h3>
        </div>

        {user && (
          <form className='button__actions'>
            {user.displayName === username && (
              <>
                <Chip
                  label='Edit'
                  onClick={() => setEditMode(true)}
                  style={{ marginRight: '10px' }}
                />
                <Chip
                  label='Delete'
                  onClick={() => {
                    db.collection('posts').doc(postId).delete();
                  }}
                />
              </>
            )}
          </form>
        )}
      </div>

      {editMode ? (
        <form className='post__editForm' onSubmit={handleSaveEdit}>
          <input
            type='text'
            placeholder='Edit your post'
            value={editedCaption}
            onChange={(e) => setEditedCaption(e.target.value)}
          />
          <button type='submit'>Save</button>
          <button type='button' onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <img className='post__image' src={imageUrl} alt='' />
          <h4 className='post__text'>
            <strong>{username}: </strong> {editedCaption}
          </h4>

          <div className='post__likes'>
            {user ? (
              <span className='like__icon' onClick={handleLike}>
                {liked ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}
              </span>
            ) : (
              <FavoriteIcon color='error' />
            )}
            <p>{likes.length} {likes.length === 1 ? 'like' : 'likes'}</p>
          </div>

          <div className='post__comments'>
            {comments.map((comment) => (
              <div key={comment.id} className='comment'>
                <p>
                  <strong>{comment.data.username}</strong>{' '}
                  {editableComment.id === comment.id ? (
                    <form onSubmit={saveEditedComment}>
                    <input
                      type='text'
                      value={editableComment.text}
                      onChange={(e) =>
                        setEditableComment({
                          id: editableComment.id,
                          text: e.target.value,
                        })
                      }
                    />
                    <button type='submit'>Save</button>
                    <button type='button' onClick={cancelEditComment}>
                      Cancel
                    </button>
                  </form>
                  ) : (
                    comment.data.text
                  )}
                </p>
                {user && user.displayName === comment.data.username && (
                  <div className='comment__actions'>
                    {!editMode && (
                      <>
                        <button
                          className='editComment__button'
                          label='Edit' 
                          onClick={() => handleEditComment(comment.id, comment.data.text)}
                        >Edit</button>
                        <button
                          className='editComment__button'

                          onClick={() => handleDelete(comment.id)}
                        >Delete</button>
                      </>
                    )}
                  </div>
                )}
                {editMode && editableComment.id === comment.id && (
                  <div className='comment__editActions'>
                    <button onClick={saveEditedComment}>Save</button>
                    <button onClick={cancelEditComment}>Cancel</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {user && (
            <form className='post__commentBox'>
              <input
                className='post__input'
                type='text'
                placeholder='Add a comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className='post__button'
                disabled={!comment}
                type='submit'
                onClick={postComment}
              >
                Post
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;