import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/inscricao';

const getInscricao = async (id_turma,id_aluno) => {
    const response = await axios.get(`${baseUrl}/${id_turma}/${id_aluno}`);
    return response.data
}

const getAlunosPorTurma = async (id_turma) => {
    const response = await axios.get(`${baseUrl}/${id_turma}`);
    return response.data
}

export default { getInscricao, getAlunosPorTurma }