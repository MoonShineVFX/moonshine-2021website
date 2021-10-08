import React from 'react'
import { BrowserRouter , Switch, Route} from 'react-router-dom';


import PublicPageLayout from '../Components/PublicPageLayout';
import DashboardLayout from '../Components/DashboardLayout';

function App() {

  return (
    <BrowserRouter>
      <Switch> 
          <Route path="/admin"   component={DashboardLayout} />
          <Route path="/"  component={PublicPageLayout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
