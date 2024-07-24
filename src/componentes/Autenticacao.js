import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import '../App.css'; 



function TopAuthenticated({ profile, logOut }) {
    console.log(profile.userPicture)
    return (
        <div style={{ marginTop: '20px' }}>
            <Alert variant='primary' style={{ height: '100px', margin: '10px' }}>
                <Row>
                    <Col md={8} alignItems='left'>
                        <h2>Autorregulação das Aprendizagens</h2>
                    </Col>
                    <Col md={4}>
                        {profile && (
                            <Container>
                                <Row className="g-2 align-items-center">
                                    <Col md={2}>
                                        <FloatingLabel>
                                            <Image src={profile.userPicture} rounded style={{ width: '70px', height: '70px' }} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={8}>
                                        <FloatingLabel>
                                            <div>{profile.userName}</div>
                                            <p>{profile.email}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={2}>
                                        <FloatingLabel>
                                            <Button variant="danger" onClick={logOut}>Log out</Button>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Container>
                        )}
                    </Col>
                </Row>
            </Alert>
        </div>
    );
}

function PageNotAuthenticated({login}) {
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleSubmit = (event) => {
        event.preventDefault();
        login(emailRef.current.value, passwordRef.current.value);
    };

    return (
        <div style={{ marginTop: '200px' }}>
            <Row className="justify-content-center">
                <Col>
                    <Alert variant='light' className="centered-alert" style={{ width: '600px', height: 'auto' }}>
                        <h2>Autorregulação das Aprendizagens</h2>
                    </Alert>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Alert variant='light' className="centered-alert" style={{ width: '600px', height: 'auto' }}>
                    <h3>Autenticação</h3>
                    <Row className="justify-content-center">
                        <Alert variant='light' className="centered-alert" style={{ width: '550px', height: 'auto' }}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Email
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Email" 
                                            ref={emailRef}
                                            required 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Password
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Password" 
                                            ref={passwordRef}
                                            required 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={{ span: 8, offset: 2 }}>
                                        <Button type="submit">Sign in</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Alert>
                    </Row>
                </Alert>
            </Row>
        </div>
    );
}

export { TopAuthenticated, PageNotAuthenticated };