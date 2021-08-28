const PessoaModel = (sequelize, DataTypes) => {
    const Pessoa = sequelize.define('Pessoa', {
        nome: DataTypes.STRING,
        nascimento: DataTypes.DATE,
        cargo: DataTypes.STRING
    })
    Pessoa.associate = ({Usuario}) =>{
        Pessoa.hasOne(Usuario)

    }
    return Pessoa
}
module.exports = PessoaModel