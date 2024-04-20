const loginRouter = require('express').Router();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
                require: true,
                rejectUnauthorized: false
        }
    },
});

loginRouter.post('/', async (req,res) => {
    const { cpf, senha } = req.body;
    const user = await sequelize.query(`SELECT * FROM login_ JOIN pessoa ON login_.cpf = pessoa.cpf WHERE login_.cpf = '${cpf}'`, { type: QueryTypes.SELECT })
    const passwordCorrect = user === null
        ? false
        : senha === await user[0].senha

    if(passwordCorrect){
       return res.json(user[0]);
    }
    else {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
})

module.exports = loginRouter