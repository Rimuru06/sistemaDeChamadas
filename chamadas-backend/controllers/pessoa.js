const pessoaRouter = require('express').Router()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialectOptions: {
        ssl: {
                require: true,
                rejectUnauthorized: false
        }
    },
});

pessoaRouter.get('/:id', async (req,res) => {
    const pessoa = await sequelize.query(`
    SELECT * FROM pessoa WHERE id = ${req.params.id}`, { type: QueryTypes.SELECT })
    
    res.json(pessoa)
})


module.exports = pessoaRouter