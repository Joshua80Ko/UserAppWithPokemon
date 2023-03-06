import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";

import Topbar from "./Topbar";
import UserRegForm from "./UserRegForm";
import Welcome from "./Welcome";
import ContactPage from "./ContactPage";
function Test(){
  return <h1>12345</h1>
}

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >    
    <Switch>
      <Route exact path="/" component={() => <Welcome/>} />
      <Route exact path="/registerUser" component={() => <UserRegForm/>} />  
      <Route exact path="/contact" component={() => <ContactPage/>} />  
      
        
    </Switch>
  </Container>
);

export default Content;
