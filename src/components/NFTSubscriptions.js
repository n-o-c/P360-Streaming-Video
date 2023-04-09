import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeNFT } from '../../actions/nfts';
import { TextField, Button } from '@material-ui/core';

const NFTSubscription = () => {
  const dispatch = useDispatch();
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenId, setTokenId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(subscribeNFT(tokenAddress, tokenId));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Token Address"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={tokenAddress}
          onChange={(event) => setTokenAddress(event.target.value)}
        />
        <TextField
          label="Token ID"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={tokenId}
          onChange={(event) => setTokenId(event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default NFTSubscription;
