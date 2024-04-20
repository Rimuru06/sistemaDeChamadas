import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/presenca';

const postPresenca = async (body) => {
    const response = await axios.post(baseUrl,body)
    return response.data
}

const getByInscricao = async (id_inscricao) => {
    const response = await axios.get(`${baseUrl}/${id_inscricao}`)
    return response.data
}

const deletePresenca = async (id_inscricao) => {
    const response = await axios.delete(`${baseUrl}/${id_inscricao}`)
    return response.data
}

export default { postPresenca, getByInscricao, deletePresenca }