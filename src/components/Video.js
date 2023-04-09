import React from 'react';
import ReactPlayer from 'react-player';
import { Typography } from '@material-ui/core';

const Video = ({ video }) => {
  return (
    <>
      <Typography variant="h4">{video.title}</Typography>
      <Typography variant="body1">{video.description}</Typography>
      <ReactPlayer url={video.url} controls />
    </>
  );
};

export default Video;
