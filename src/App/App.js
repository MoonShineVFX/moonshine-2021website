import React from 'react'
import { BrowserRouter , Switch, Route} from 'react-router-dom';


import PublicPageLayout from '../Components/PublicPageLayout';
import DashboardLayout from '../Components/DashboardLayout';
import AuthLayout from '../Components/AuthLayout';
import PrivateRoute from '../Components/PrivateRoute';
import { AuthProvider } from "../Components/Auth";
function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Switch> 
          <PrivateRoute   path="/admin/:path"   component={DashboardLayout} />
          <Route   path="/login"  component={AuthLayout} />
          <Route   path="/"  component={PublicPageLayout} />
          
      </Switch>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
