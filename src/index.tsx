import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { UsersContextProvider } from './contexts/UsersContext';
import { AssetsContextProvider } from './contexts/AssetsContext';
import { GeneralContextProvider } from './contexts/GeneralContext';

import Routes from './routes';
import reportWebVitals from './reportWebVitals';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <GeneralContextProvider>
      <UsersContextProvider>
        <AssetsContextProvider>
          <Routes />
        </AssetsContextProvider>
      </UsersContextProvider>
    </GeneralContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();