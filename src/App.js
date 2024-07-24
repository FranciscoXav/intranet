import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import usersData from './dados/json/users.json';
import { TopAuthenticated, PageNotAuthenticated } from './componentes/Autenticacao.js';
import { DisciplinaModulo } from './componentes/DisciplinaModulo.js';

function CredenciaisNaoAutorizadas(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
                    <h4>Acesso negado</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p align='center'>Introduziu Credenciais erradas pelo que não está autorizado a entrar na plataforma</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Sair</Button>
            </Modal.Footer>
        </Modal>
    );
}

function App() {

    const [profile, setProfile] = useState(null);
    const [isUserAllowed, setIsUserAllowed] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const selectedUserRef = useRef(null);
    const selectedUserNameRef = useRef(null);


    const login = (email, password) => {
        const userExists = checkUserExists(email, password);
        const userProfile = { email, userId: userExists.userId, userName: userExists.userName, userPicture: userExists.userPicture };
        selectedUserRef.current = userProfile;
        setProfile(userProfile);
        if (userExists.exists) {
            setSelectedUserId(userExists.userId);
            selectedUserNameRef.current = userExists.userName;
            setIsUserAllowed(true);
        } else {
            setIsUserAllowed(false);
            setModalShow(true);
        }
    };

    const logOut = () => {
        setProfile(null);
        setIsUserAllowed(false);
        selectedUserRef.current = null;
        selectedUserNameRef.current = null;
    };

    useEffect(() => {
        if (!modalShow) {
            setProfile(null);
            setIsUserAllowed(false);
            selectedUserRef.current = null;
        }
    }, [modalShow]);



    const checkUserExists = (email, password) => {
        const user = usersData.users.find((user) => user.email === email && user.password === password);
        if (user) {
            return { exists: true, userId: user.id, userName: user.nome, userPicture: require(`./dados/fotos/${user.id}.jpg`) };
        }
        return { exists: false, userId: null, userName: null,userPicture: '' };
    };

    return (
        <div className="App">
            {!selectedUserRef.current ? (
                <PageNotAuthenticated login={login} />
            ) : (
                isUserAllowed ? (
                    <>
                        <TopAuthenticated profile={profile} logOut={logOut}/>
                        <DisciplinaModulo selectedUserId={selectedUserId} />
                    </>
                ) : (
                    <CredenciaisNaoAutorizadas
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                )
            )}
        </div>
    );
}

export default App;
