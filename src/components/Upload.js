import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadVideo } from '../../actions/videos';
import { TextField, Button, Typography } from '@material-ui/core';

const Upload = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('videoFile', videoFile);
    dispatch(uploadVideo(formData));
  };

  return (
    <>
      <Typography variant="h4">Upload Video</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input type="file" onChange={e => setVideoFile(e.target.files[0])} />
        <Button variant="contained" color="primary" type="submit">
          Upload
        </Button>
      </form>
    </>
  );
};

export default Upload;
