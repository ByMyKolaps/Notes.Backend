import { FC, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import userManager, { loadUser, signInRedirect, signOutRedirect } from './auth/user-service';
import AuthProvider from './auth/auth-provider';
import SignInOidc from './auth/SignInOidc';
import SignOutOidc from './auth/SignOutOidc';
import NoteList from './notes/NoteList';

const App: FC<{}> = (): ReactElement => {
  loadUser();
  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={() => signInRedirect()}>Login</button>
        <AuthProvider userManager={userManager}>
          <Router>
            <Routes>
              <Route path='/' Component={NoteList} />
              <Route path='/signout-oidc' Component={SignOutOidc}/>
              <Route path='/signin-oidc' Component={SignInOidc}/>
            </Routes>
          </Router>
        </AuthProvider>
      </header>
    </div>
  )
}
  

export default App;
