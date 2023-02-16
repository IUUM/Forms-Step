import React from 'react';
import ReactDOM  from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './components/App';


const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <>
      <Provider store={store}>
        <App></App>
      </Provider>
    </>
)
//ReactDOM.render(<App/>,document.getElementById('app'));