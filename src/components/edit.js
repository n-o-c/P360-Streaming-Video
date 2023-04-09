import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getVideo, updateVideo } from '../../actions/videos';
import { TextField, Button } from '@material-ui/core';

const Edit = () => {
const { id } = useParams();
const history = useHistory();
const dispatch = useDispatch();
const video = useSelector(state => state.videos.video);
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');

useEffect(() => {
dispatch(getVideo(id));
}, [dispatch, id]);

useEffect(() => {
setTitle(video.title);
setDescription(video.description);
}, [video]);

const handleSubmit = e => {
e.preventDefault();
const updatedVideo = {
title,
description
};
dispatch(updateVideo(id, updatedVideo));
history.push(/video/${id});
};

const handleTitleChange = e => {
setTitle(e.target.value);
};

const handleDescriptionChange = e => {
setDescription(e.target.value);
};

return (
<div>
<h2>Edit Video</h2>
<form onSubmit={handleSubmit}>
<TextField
       label="Title"
       variant="outlined"
       fullWidth
       margin="normal"
       value={title}
       onChange={handleTitleChange}
     />
<TextField
       label="Description"
       variant="outlined"
       fullWidth
       margin="normal"
       value={description}
       onChange={handleDescriptionChange}
     />
<Button variant="contained" color="primary" type="submit">
Save
</Button>
</form>
</div>
);
};

export default Edit;
