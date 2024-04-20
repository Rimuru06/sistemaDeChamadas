import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/pessoa';


const getPessoaPorId = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data
}


export default { getPessoaPorId };