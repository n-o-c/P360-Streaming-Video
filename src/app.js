import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import store from './store';
import { loadUser } from './actions/auth';
import { getWeb3, getContracts } from './utils/contracts';

import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Video from './components/Video';
import Search from './components/Search';
import Upload from './components/Upload';
import Edit from './components/Edit';
import NFTSubscription from './components/NFTSubscription';
import Admin from './components/Admin';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  useEffect(() => {
    store.dispatch(loadUser());

    // Initialize web3 and smart contracts
    const initWeb3 = async () => {
      const web3 = await getWeb3();
      const contracts = await getContracts(web3);
      store.dispatch({ type: 'SET_WEB3', payload: { web3, contracts } });
    };

    initWeb3();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/video/:id" component={Video} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/edit/:id" component={Edit} />
            <Route exact path="/nft-subscription" component={NFTSubscription} />
            <Route exact path="/admin" component={Admin} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
