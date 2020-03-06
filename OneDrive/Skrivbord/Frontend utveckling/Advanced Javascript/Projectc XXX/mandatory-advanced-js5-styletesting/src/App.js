import React from "react";

import { BrowserRouter as Router, Route } from 'react-router-dom';

import "./Css/nav.css";

import Main from "./Components/Main";
import LogIn from "./Components/LogIn";
import GetToken from "./Components/GetToken";
import DropBoxFolder from "./Components/DropBoxFolder"

function App() {
  return (

    <div className="App">

      <Router>
        <Route exact path="/" component={LogIn} />
        <Route path="/auth" component={GetToken} />

        <Route exact path="/main" component={Main} />
        <Route path="/main/:path+" component={DropBoxFolder} />

        {/* <Route path="/folder/:path" render={(props) => <DropBoxFolder id={props.match.params.path} />} /> */}
      </Router>
    </div>
  );
}

export default App;
