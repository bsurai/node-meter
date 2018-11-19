import * as React from 'react';
import './App.css';
import Layout from './layouts/general';
import SetupPage from './pages/setup';

class App extends React.Component {
  public render() {
    return (
      <Layout>
        <SetupPage/>
      </Layout>);
  }
}

export default App;
