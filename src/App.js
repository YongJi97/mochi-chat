import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login"
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import firebase from "firebase"
import {auth, provider} from "./firebase"

import { useStateValue } from "./StateProvider"

function App() {
  const [{user}, dispatch] = useStateValue();

  // useEffect(()=>{
  //   auth.onAuthStateChanged(function(user) {
  //     if (user) {
  //       console.log("USER IS SIGNED IN!!!")
  //       console.log(user)
  //       return (
  //         <div className="app_body">
  //           <Router>
  //             <Sidebar />
  
  //             <Switch>
  //               <Route path="/rooms/:roomId">
  //                 <Chat />
  //               </Route>
  
  //               <Route path="/">
  //                 <h1>Select a chat room</h1>
  //                 {/* <Chat /> */}
  //               </Route>
                
  //               <Route path="/*">
  //                 <h1>Select a chat room</h1>
  //                 {/* <Chat /> */}
  //               </Route>
                
  //             </Switch>
  //           </Router>
  //         </div>
  //       )
  //     }
  
  //     else{
  //       return (<Login />)
  //     }
  //   });
  // },[user])

 
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />

            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>

              <Route path="/">
                <h1>Select a chat room</h1>
                {/* <Chat /> */}
              </Route>
              
              <Route path="/*">
                <h1>Select a chat room</h1>
                {/* <Chat /> */}
              </Route>
              
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
