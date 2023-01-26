import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { Alchemy, Network } from "alchemy-sdk";
import { fetchLatestBlockWithTransactions } from './store/block.reducer';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

alchemy.ws.on("block", (block) => {
  console.log(block);
  store.dispatch(fetchLatestBlockWithTransactions(block))
});


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
