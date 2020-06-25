import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Tabs from 'components/Tabs';
import UserPanel from 'components/UserPanel';
import AdminPanel from 'components/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Tabs />
      <Switch>
        <Route exact path='/' component={UserPanel} />
        <Route path='/admins' component={AdminPanel} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
