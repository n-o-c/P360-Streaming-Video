import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';

const Navbar = () => {
const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

return (
<AppBar position="static">
<Toolbar>
<Typography variant="h6" style={{ flexGrow: 1 }}>
P360
</Typography>
<Button color="inherit" component={Link} to="/">
Home
</Button>
{isAuthenticated && (
<>
<Button color="inherit" component={Link} to="/dashboard">
Dashboard
</Button>
<Button color="inherit" component={Link} to="/upload">
Upload
</Button>
<Button color="inherit" component={Link} to="/search">
Search
</Button>
</>
)}
{!isAuthenticated && (
<>
<Button color="inherit" component={Link} to="/register">
Register
</Button>
<Button color="inherit" component={Link} to="/login">
Login
</Button>
</>
)}
</Toolbar>
</AppBar>
);
};

export default Navbar;
