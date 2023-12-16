import React, { useState } from 'react';
import { storage, db } from './firebase';
import firebase from 'firebase/compat/app';
import './ImageUpload.css';


function ImageUpload({username}) {
const [image, setImage] = useState(null);
const [progress, setProgress] = useState(0);
const [caption, setCaption] = useState('');

const handleChange = (e) => {
    if (e.target.files[0]) {
        setImage(e.target.files[0]);
    }
}

const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    
    uploadTask.on(
        'state_change',
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        (error) => {
            console.log(error);
            alert(error.message);
        },
        () => {
            //complete function
            storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                // post image inside db
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });

                    setProgress(0);
                    setCaption('');
                    setImage(null);
                })
        }
    )
}

return (
    <div className='imageupload'>
        <progress className='imageupload__progress' value={progress} max='100' />
        <input className='input__caption' type='text' value={caption} placeholder='Enter a caption' onChange={event => setCaption(event.target.value)}/>
        <input className='input__file' type='file' onChange={handleChange} />
        <button className='button__post' onClick={handleUpload}>
            Post
        </button>

    </div>
)
}

export default ImageUpload