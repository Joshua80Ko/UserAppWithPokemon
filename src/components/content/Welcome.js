import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import './Welcome.css';

import { Container ,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
}  from "reactstrap";




function Welcome(){
    return (
        <Container>
            <div>
                <br></br>
                <br></br>
                <h1>About this</h1>
                <br></br>

                <p>Welcome to my first React app!
                   This app is gathering user data. To register Click the 'Register User' menu on the left panel.
                   There are 4 steps to submit user information.
                </p>
                <ul>
                    <li>Step  1: User Form</li>
                    <li>Step 2: Select Pokemon</li>
                    <li>Step 3: Review</li>
                    <li>Step 4: Submitted</li>
                </ul>
                <p>It's saving the user data to the <mark>browser local storage</mark>. 
                So If a user refreshed the page, the user would still see their input. 
                (Saving to Database has not been implemented yet.)
                <br></br><br></br>
                Pokemon can be selected by <mark>type of Pokemon</mark>.
                The images were downloaded from external source by pokemon Id.
                <br></br>
                (https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png)

                <br></br><br></br>
                User can <mark>go back to any previous step</mark> but not next step without action such as clicking save.               
                </p>
            </div>
        </Container>

    );

}


export default Welcome;
