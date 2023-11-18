const presencaRouter = require('express').Router()

const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialectOptions: {
        ssl: {
                require: true,
                rejectUnauthorized: false
        }
    },
});

presencaRouter.get('/', async (req,res) => {
    const presencas = await sequelize.query("SELECT * FROM presenca", { type: QueryTypes.SELECT})
    res.json(presencas)
})

presencaRouter.get('/:id_inscricao', async (req,res) => {
    const id_inscricao = req.params.id_inscricao
    const presencas = await sequelize.query(`SELECT * FROM presenca WHERE id_inscricao =${id_inscricao}`, { type: QueryTypes.SELECT})
    res.json(presencas)
})

presencaRouter.post('/', async (req,res) => {
    const id_inscricao = req.body.id_inscricao
    
    const presenca = await sequelize.query(
        `INSERT INTO presenca (id_inscricao, data) VALUES (${id_inscricao}, to_timestamp(${Date.now()/1000}))`, { type: QueryTypes.INSERT })
    res.json(presenca)

})

presencaRouter.delete('/:id', async (req,res) => {
    const id = req.params.id
    const presencaDeleted = await sequelize.query(`DELETE FROM presenca WHERE id = ${id}`, { type: QueryTypes.DELETE })
    res.json(presencaDeleted)
})

module.exports = presencaRouter