import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/aula';

const postAula = async (body) => {
    const response = await axios.post(baseUrl,body)
    return response.data
}

const getAulasDaTurma = async (id_turma) => {
    const response = await axios.get(`${baseUrl}/${id_turma}`)
    return response.data
}

const fecharTurma = async (body) => {
    const response = await axios.put(`${baseUrl}`, body)
    return response.data
}

export default { postAula, getAulasDaTurma, fecharTurma }