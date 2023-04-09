import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideos } from '../../actions/videos';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const Dashboard = () => {
  const dispatch = useDispatch();
  const videos = useSelector(state => state.videos.videos);

  useEffect(() => {
    dispatch(getVideos());
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Views</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((video, index) => (
              <TableRow key={index}>
                <TableCell>{video.title}</TableCell>
                <TableCell>{video.description}</TableCell>
                <TableCell>{video.views}</TableCell>
                <TableCell>{video.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
