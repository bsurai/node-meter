import * as React from 'react';
import logo from '../logo.svg';

const GeneralLayout = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Setup</h1>
      </header>
      {children}
    </div>);
}

export default GeneralLayout;
