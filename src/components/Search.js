import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchVideos } from '../../actions/videos';
import { TextField, Button, Typography } from '@material-ui/core';
import VideoList from '../videos/VideoList';

const Search = () => {
  const dispatch = useDispatch();
  const videos = useSelector(state => state.videos.searchResults);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(searchVideos(searchTerm));
  };

  return (
    <>
      <Typography variant="h4">Search Videos</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>
      <VideoList videos={videos} />
    </>
  );
};

export default Search;
