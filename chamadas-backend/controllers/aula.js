const aulaRouter = require('express').Router()

const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialectOptions: {
        ssl: {
                require: true,
                rejectUnauthorized: false
        }
    },
});

aulaRouter.post('/', async (req,res) => {
    const id_turma = req.body.id_turma
    const status_code = req.body.status_code
    
    const aula = await sequelize.query(
        `INSERT INTO aula (id_turma, status_code, data_) VALUES (${id_turma}, ${status_code}, to_timestamp(${Date.now()/1000}))`, { type: QueryTypes.INSERT })
    res.json(aula)

})

aulaRouter.put('/', async (req,res) => {
    const id_ultimo = req.body.id_ultimo
    const aula = await sequelize.query(`UPDATE aula SET status_code = 0 WHERE id = ${id_ultimo}`, { type: QueryTypes.UPDATE })
    res.json(aula)
})

aulaRouter.get('/:id_turma', async (req,res) => {
    const id_turma = req.params.id_turma
    const aulas = await sequelize.query(`SELECT * FROM aula WHERE id_turma = ${id_turma} ORDER BY data_ DESC`, { type: QueryTypes.SELECT })
    res.json(aulas)
})



module.exports = aulaRouter