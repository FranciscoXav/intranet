import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

function Registos({ selectedUserId, selectedModuloId, selectedDisciplinaId, selectedCursoId, selectedConteudoId, selectedConteudoNome }) {
    console.log(selectedConteudoId, "-", selectedConteudoNome);
    const [registos, setRegistos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const initialNewRegistoState = {
        UserId: selectedUserId,
        ModuloId: selectedModuloId,
        DisciplinaId: selectedDisciplinaId,
        cursoId: selectedCursoId,
        ConteudoId: selectedConteudoId,
        Data: '',
        NivelConsecucao: '',
        Dificuldades: '',
        Progresso: '',
        Comentarios: ''
    };

    const [newRegisto, setNewRegisto] = useState(initialNewRegistoState);

    useEffect(() => {

        setNewRegisto({
            UserId: selectedUserId,
            ModuloId: selectedModuloId,
            DisciplinaId: selectedDisciplinaId,
            cursoId: selectedCursoId,
            ConteudoId: selectedConteudoId,
            Data: '',
            NivelConsecucao: '',
            Dificuldades: '',
            Progresso: '',
            Comentarios: ''
        });

        if (selectedModuloId && selectedDisciplinaId && selectedCursoId && selectedConteudoId) {
            fetch('http://localhost:4000/registos')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const filteredRegistos = data.filter(
                        (registo) =>
                            registo.UserId === selectedUserId &&
                            registo.ModuloId === selectedModuloId &&
                            registo.DisciplinaId === selectedDisciplinaId &&
                            registo.cursoId === selectedCursoId &&
                            registo.ConteudoId === selectedConteudoId
                    );
                    setRegistos(filteredRegistos);
                })
                .catch(error => {
                    console.error("There was an error fetching the registos!", error);
                });
        }
    }, [selectedUserId, selectedModuloId, selectedDisciplinaId, selectedCursoId, selectedConteudoId]);

    const handleShowModal = () => {
        setErrorMessage("");
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewRegisto(initialNewRegistoState); // Resetting the form fields
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRegisto({ ...newRegisto, [name]: value });
    };

    const SalvarNovoRegisto = () => {
        if (newRegisto.NivelConsecucao === "") {
            setErrorMessage("Tem que selecionar um nivel de consecução");
        } else {
            const novoRegisto = { ...newRegisto, Data: new Date().toLocaleDateString() };
            console.log(novoRegisto);

            fetch('http://localhost:4000/registos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoRegisto)
            })
                .then(response => response.json())
                .then(data => {
                    setRegistos([...registos, data]);
                    handleCloseModal();
                })
                .catch(error => {
                    console.error("There was an error saving the registo!", error);
                });
        }
    };

    return (
        <>
            <Row>
                <Col>
                    <Card style={{ margin: '10px', textAlign: 'left' }}>
                        <Card.Body>
                            <Card.Title>
                                <p>Registos de autorregulação</p>
                                <p><h6>{selectedConteudoNome}</h6></p>
                            </Card.Title>
                        </Card.Body>
                    </Card>

                    {registos.length > 0 ? (
                        registos.map((registo, index) => (
                            <div key={registo.id} style={{ marginTop: '20px' }}>
                                <p></p>
                                <Alert 
                                variant={
                                            registo.NivelConsecucao === "1" ? 'success' : 
                                            registo.NivelConsecucao === "2" ? 'warning' :
                                            registo.NivelConsecucao === "3" ? 'warning' :
                                            registo.NivelConsecucao === "4" ? 'danger'  :
                                            'light'
                                    }
                                style={{ margin: '10px' }}>
                                    <Row>
                                        <Col md={2}>
                                            <Form.Group>
                                                <FloatingLabel>
                                                    <Form.Control
                                                        type='text'
                                                        readOnly
                                                        disabled
                                                        value={registo ? registo.Data : ""}
                                                        style={{
                                                            height: '100px',
                                                            overflow: 'scroll',
                                                            resize: 'none',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            textAlign: 'center',
                                                            padding: '0'
                                                        }}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <FloatingLabel label="">
                                                    <Form.Check
                                                        reverse
                                                        disabled
                                                        label="Atingi plenamente"
                                                        name={`group${index}`}
                                                        type="radio"
                                                        id={`reverse-checkbox-1-${index}`}
                                                        checked={Number(registo.NivelConsecucao) === 1}
                                                    />
                                                    <Form.Check
                                                        reverse
                                                        disabled
                                                        label="Atingi"
                                                        name={`group${index}`}
                                                        type="radio"
                                                        id={`reverse-checkbox-2-${index}`}
                                                        checked={Number(registo.NivelConsecucao) === 2}
                                                    />
                                                    <Form.Check
                                                        reverse
                                                        disabled
                                                        label="Atingi com dificuldades"
                                                        name={`group${index}`}
                                                        type="radio"
                                                        id={`reverse-checkbox-3-${index}`}
                                                        checked={Number(registo.NivelConsecucao) === 3}
                                                    />
                                                    <Form.Check
                                                        reverse
                                                        disabled
                                                        label="Ainda não atingi"
                                                        name={`group${index}`}
                                                        type="radio"
                                                        id={`reverse-checkbox-4-${index}`}
                                                        checked={Number(registo.NivelConsecucao) === 4}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <FloatingLabel label="Dificuldades">
                                                    <Form.Control
                                                        as="textarea"
                                                        readOnly
                                                        disabled
                                                        value={registo ? registo.Dificuldades : ""}
                                                        style={{ height: '100px', overflow: 'scroll', resize: 'none' }}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <FloatingLabel label="Comentarios do professor">
                                                    <Form.Control
                                                        as="textarea"
                                                        readOnly
                                                        disabled
                                                        value={registo ? registo.Comentarios : ""}
                                                        style={{ height: '100px', overflow: 'hidden', resize: 'none' }}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Alert>
                            </div>
                        ))
                    ) : (
                        <p>Não há registos para o módulo selecionado.</p>
                    )}
                    <div>
                        <Button variant="primary" onClick={handleShowModal} style={{ marginBottom: '20px' }}>
                            Adicionar Registo
                        </Button>
                    </div>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Adicionar Novo Registo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                            <Form>
                                <Form.Group className="mb-3">
                                    <FloatingLabel label="Nível de Consecusão">
                                        <Form.Select
                                            name="NivelConsecucao"
                                            value={newRegisto.NivelConsecucao}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Selecione</option>
                                            <option value={1}>Atingi plenamente</option>
                                            <option value={2}>Atingi</option>
                                            <option value={3}>Atingi com dificuldades</option>
                                            <option value={4}>Ainda não atingi</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <FloatingLabel label="Dificuldades">
                                        <Form.Control
                                            as="textarea"
                                            name="Dificuldades"
                                            value={newRegisto.Dificuldades}
                                            onChange={handleInputChange}
                                            style={{ height: '100px', overflow: 'scroll', resize: 'none' }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={SalvarNovoRegisto}>
                                Salvar Registo
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </>
    );
}

export default Registos;

