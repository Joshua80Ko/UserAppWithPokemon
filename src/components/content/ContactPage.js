import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <Container>
        <br></br><br></br>
      <Row>
        <Col md={6}>
          <h1>Contact Us</h1>
          <p>We're always here to help. Reach out to us using the form below or using the contact information provided.</p>
          <ul className="list-unstyled">
            <li><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:Joshua80.Ko@gmail.com">Joshua80.Ko@gmail.com</a></li>
            <li><FontAwesomeIcon icon={faPhone} /> +1 (647) 986-3255</li>
            <li><FontAwesomeIcon icon={faMapMarkerAlt} /> 1262 Don Mills, North York, On, Ca</li>
          </ul>
        </Col>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input type="textarea" name="message" id="message" placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)} />
            </FormGroup>
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactPage;