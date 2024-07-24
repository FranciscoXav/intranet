
import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ModConteudos from './ModuloConteudos';

import UsersData from '../dados/json/users.json';
import AlunosTurmasData from '../dados/json/alunos_turmas.json';
import TurmasData from '../dados/json/turmas.json';
import CursosData from '../dados/json/estrutura_curricular.json'; 

function DisciplinaModulo({ selectedUserId }) {
    const [turma, setTurma] = useState(null);
    const [curso, setCurso] = useState(null);
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplina, setDisciplina] = useState('');
    const [modulos, setModulos] = useState([]);
    const [modulo, setModulo] = useState('');

    useEffect(() => {
        const user = UsersData.users.find(user => user.id === selectedUserId);
        if (user && user.perfil === "aluno") {
            const alunoTurma = AlunosTurmasData.alunos_turmas.find(at => at.id_user === user.id);
            if (alunoTurma) {
                const turmaInfo = TurmasData.turmas.find(turma => turma.id === alunoTurma.turmaId);
                if (turmaInfo) {
                    setTurma(turmaInfo);
                    const cursoInfo = CursosData.find(curso => curso.id === turmaInfo.cursoId);
                    if (cursoInfo) {
                        setCurso(cursoInfo);
                        setDisciplinas(cursoInfo.disciplinas || []);
                    }
                }
            }
        }
    }, [selectedUserId]);



    const handleDisciplinaChange = (e) => {
        const selectedDisciplinaId = e.target.value;
        setDisciplina(selectedDisciplinaId);

        const selectedDisciplina = disciplinas.find(disciplinaItem => disciplinaItem.id === selectedDisciplinaId);
        if (selectedDisciplina) {
            setModulos(selectedDisciplina.modulos || []);
        } else {
            setModulos([]);
        }
        setModulo(''); 
    };

    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <Alert variant='secondary' style={{ margin: '10px' }}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Curso">
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        value={curso ? curso.curso : ""}
                                        disabled
                                        size="lg"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Turma">
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        value={turma ? turma.turma : ""}
                                        disabled
                                        size="lg"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                </Alert>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Alert variant='light' style={{ margin: '10px' }}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Disciplina">
                                    <Form.Select name="disciplina" value={disciplina} onChange={handleDisciplinaChange}>
                                        <option value="">Selecione uma disciplina</option>
                                        {disciplinas.map(disciplinaItem => (
                                            <option key={disciplinaItem.id} value={disciplinaItem.id}>{disciplinaItem.disciplina}</option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Módulo">
                                    <Form.Select name="modulo" value={modulo} onChange={(e) => setModulo(e.target.value)} disabled={!disciplina}>
                                        <option value="">Selecione um módulo</option>
                                        {modulos.map(moduloItem => (
                                            <option key={moduloItem.id} value={moduloItem.id}>{moduloItem.modulo}</option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                </Alert>
            </div>

            <div>
                {/* Verifica se todos os IDs estão definidos antes de renderizar ModConteudos */}
                {modulo && disciplina && curso && (
                    <ModConteudos 
                        selectedUserId={selectedUserId} 
                        selectedCursoId={curso.id} 
                        selectedDisciplinaId={disciplina} 
                        selectedModuloId={modulo} 
                    />
                )}
            </div>
        </>
    );
}

export { DisciplinaModulo };