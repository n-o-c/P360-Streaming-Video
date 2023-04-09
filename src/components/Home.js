import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideos } from '../../actions/videos';
import VideoCard from '../VideoCard';
import { Typography } from '@material-ui/core';

const Home = () => {
  const dispatch = useDispatch();
  const featured = useSelector(state => state.videos.featured);
  const latest = useSelector(state => state.videos.latest);
  const popular = useSelector(state => state.videos.popular);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Featured Videos
      </Typography>
      <div style={{ display: 'flex' }}>
        {featured.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>

      <Typography variant="h4" gutterBottom>
        Latest Videos
      </Typography>
      <div style={{ display: 'flex' }}>
        {latest.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>

      <Typography variant="h4" gutterBottom>
        Popular Videos
      </Typography>
      <div style={{ display: 'flex' }}>
        {popular.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
