import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import Registos from './Registos'; 

import CursosData from '../dados/json/estrutura_curricular.json';

function ModConteudos({ selectedUserId,selectedModuloId, selectedDisciplinaId, selectedCursoId }) {
    const [selectedModuloNome, setSelectedModuloNome] = useState("");
    const [conteudos, setConteudos] = useState([]);
    const [selectedConteudoId, setSelectedConteudoId] = useState(null);
    const [selectedConteudoNome, setSelectedConteudoNome] = useState("");
    const [selectedButtonId, setSelectedButtonId] = useState(null);

    useEffect(() => {
        if (selectedUserId && selectedModuloId && selectedDisciplinaId && selectedCursoId) {
            const cursoSelecionado = CursosData.find(curso => curso.id === selectedCursoId);
            if (cursoSelecionado) {
                const disciplinaSelecionada = cursoSelecionado.disciplinas.find(disciplina => disciplina.id === selectedDisciplinaId);
                if (disciplinaSelecionada) {
                    const moduloSelecionado = disciplinaSelecionada.modulos.find(modulo => modulo.id === selectedModuloId);
                    if (moduloSelecionado && moduloSelecionado.conteudos) {
                        setSelectedModuloNome(moduloSelecionado.modulo);
                        setConteudos(moduloSelecionado.conteudos.map(conteudo => ({ id: conteudo.id, nome: conteudo.conteudo })));
                    } else {
                        setConteudos([]);
                    }
                } else {
                    setConteudos([]);
                }
            } else {
                setConteudos([]);
            }
        } else {
            setConteudos([]);
        }
    }, [selectedUserId,selectedModuloId, selectedDisciplinaId, selectedCursoId]);

    const handleButtonClick = (id, nome) => {
        setSelectedConteudoId(id);
        setSelectedConteudoNome(nome);
        setSelectedButtonId(id);
    };

    useEffect(() => {

    }, [selectedConteudoId, selectedConteudoNome]);

    return (
        <div style={{ marginTop: '20px' }}>
            <Row>
                <Col md={4}>
                    <Alert variant='info' style={{ margin: '10px', height: '100%' }}>
                        <Card variant='primary' style={{ margin: '10px', textAlign: 'center' }} >
                            <Card.Title>Conteúdos do Módulo</Card.Title>
                            <Card.Body>{selectedModuloNome}</Card.Body>
                        </Card>

                        {conteudos.length > 0 ? (
                            conteudos.map((conteudo) => (
                                <div key={conteudo.id} className="d-grid gap-2">
                                    <Button
                                        value={[conteudo.id, conteudo.nome]}
                                        variant={selectedButtonId === conteudo.id ? 'secondary' : 'light'}
                                        size="sm"
                                        style={{ margin: '10px' }}
                                        onClick={() => handleButtonClick(conteudo.id, conteudo.nome)}
                                    >
                                        {conteudo.nome}
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum conteúdo disponível para o módulo selecionado.</p>
                        )}
                    </Alert>
                </Col>
                <Col>
                    <Alert variant='light' style={{ margin: '10px' }}>
                        {selectedConteudoId && (
                            <Registos
                                selectedUserId={selectedUserId}
                                selectedCursoId={selectedCursoId}
                                selectedDisciplinaId={selectedDisciplinaId}
                                selectedModuloId={selectedModuloId}
                                selectedConteudoId={selectedConteudoId}
                                selectedConteudoNome={selectedConteudoNome}
                            />
                        )}
                    </Alert>
                </Col>
            </Row>
        </div>
    );
}

export default ModConteudos;
