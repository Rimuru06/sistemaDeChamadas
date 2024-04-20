const turmaRouter = require('express').Router()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialectOptions: {
        ssl: {
                require: true,
                rejectUnauthorized: false
        }
    },
});

/* Retorna todas as turmas */
turmaRouter.get('/', async (req,res) => {
    const turmas = await sequelize.query("SELECT * FROM turma", { type: QueryTypes.SELECT })
    res.json(turmas)
})

/* Retorna turma por id */
turmaRouter.get('/:id', async (req,res) => {
    const turma = await sequelize.query(`
    SELECT turma.id, disciplina.nome AS nome_disciplina, pessoa.nome AS nome_professor FROM turma
    INNER JOIN pessoa ON turma.id_professor = pessoa.id
    INNER JOIN disciplina ON turma.id_disciplina = disciplina.id
    WHERE turma.id = ${req.params.id}`, { type: QueryTypes.SELECT })
    
    res.json(turma)
})

/* Retorna turma por id do professor */
turmaRouter.get('/professor/:id_professor', async (req,res) => {
    const id_professor = req.params.id_professor
    const turmas = await sequelize.query(`SELECT * FROM turma JOIN disciplina ON turma.id_disciplina = disciplina.id WHERE turma.id_professor = ${id_professor}`, { type: QueryTypes.SELECT })
    res.json(turmas)
})

/* Retornas as turmas em que um aluno está inscrito (por id do aluno) */
turmaRouter.get('/aluno/:id_aluno', async (req,res) => {
    const turmas = await sequelize.query(
        `SELECT * FROM turma JOIN disciplina ON turma.id_disciplina = disciplina.id WHERE turma.id IN (SELECT id_turma FROM inscricao WHERE id_aluno = ${req.params.id_aluno});`, { type: QueryTypes.SELECT })
    res.json(turmas)

})

module.exports = turmaRouter