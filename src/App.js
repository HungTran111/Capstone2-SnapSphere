import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input'; 
import ImageUpload from './ImageUpload';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser)
        setUser(authUser)
      } else {
        //user has logged out
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <form className='app__signup'>
            <center>
              <img src='https://cdn.icon-icons.com/icons2/687/PNG/96/instagram_icon-icons.com_61256.png' alt=''/>
            </center>
            <Input
              type ='text'
              placeholder = 'username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type ='text'
              placeholder = 'email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type ='password'
              placeholder = 'password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='button__signupForm' type='submit' onClick={signUp}>Sign Up</button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <form className='app__signup'>
            <center>
              <img src='https://cdn.icon-icons.com/icons2/687/PNG/96/instagram_icon-icons.com_61256.png' alt=''/>
            </center>
            <Input
              placeholder = 'email'
              type ='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder = 'password'
              type ='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='button__signinForm' type='submit' onClick={signIn}>Sign In</button>
          </form>
        </Box>
      </Modal>

      <div className='app__header'>
        <h1 className='app__headerLogo'>SnapSphere</h1>
        {user ? (
        <div className='app__userContainer'>
          <span className='app__userName'>{user.displayName}</span>
          <button className='button__logout' onClick={() => auth.signOut()}>
            Log Out
          </button>
        </div>
      ): (
        <div className='app__loginContainer'>
          <button className='button__signin' onClick={() => setOpenSignIn(true)}>Sign In</button>
          <button className='button__signup' onClick={() => setOpen(true)}>Sign Up</button>
        </div>
      )}
      </div>

      <div className='upload__box'>
        {user?.displayName ? (
          <ImageUpload username={user.displayName}/>  
        ) : (
          <h3 className='signintoupload'>Sign In To Upload</h3>
        )}
      </div>
      
      
      <div className='app__posts'>
        {
          posts.map(({ id, post }) => (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
