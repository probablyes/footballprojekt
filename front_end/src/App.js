import React from 'react';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";


// import logo from './logo.svg';
import './App.css';
import UserList from './components/Users/UserList/UserList';
import UserForm from './components/Users/UserForm/UserForm';
import DruzynyList from './components/Druzyny/DruzynyList/DruzynyList';
import DruzynyForm from './components/Druzyny/DruzynyForm/DruzynyForm';
import Navigation from './components/Navigation/Navigation';
import Footer from "./components/Footer/Footer";
import MeczeList from "./components/Mecze/RecordList/RecordList";
import MeczeForm from "./components/Mecze/RecordForm/RecordForm";
import WystepyList from "./components/Wystepy/RecordList/RecordList";
import WystepyForm from "./components/Wystepy/RecordForm/RecordForm";
import Login from "./components/Login/LoginContainer";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path="/">
          <p>Strona główna</p>
        </Route>
        <Route exact path="/users">
          <UserList/>
        </Route>
        <Route exact path="/users/form">
          <UserForm/>
        </Route>
          <Route exact path="/druzyny">
              <DruzynyList/>
          </Route>
          <Route exact path="/druzyny/form">
              <DruzynyForm/>
          </Route>
          <Route exact path="/mecze">
              <MeczeList/>
          </Route>
          <Route exact path="/mecze/form">
              <MeczeForm/>
          </Route>
          <Route exact path="/wystepy">
              <WystepyList/>
          </Route>
          <Route exact path="/wystepy/form">
              <WystepyForm/>
          </Route>
          <Route exact path="/login">
              <Login/>
          </Route>
      </Switch>

        <Footer/>
    </div>
  );
}

export default App;
