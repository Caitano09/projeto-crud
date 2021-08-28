const findAll = async(connection) => {
    const offset = params.currentPage * params.pageSize
    const pageSize = params.pageSize
    const count = await connection('pessoas').count('id as total')
    const total = count[0].total
    const totalPages = Math.ceil(total / pageSize)

    const pessoas = await connection('pessoas').select('*').limit(pageSize).offset(offset)
    
    return {
        data: pessoas,
        pagination: {
            pages: totalPages,
            pageSize,
            currentPage: parseInt(params.currentPage)
        }
    }
}

const findById = async(connection, idPessoa) => {
    const pessoa = await connection('pessoas').where({id: idPessoa}).select('*')
    if(pessoa.length > 0){
        return pessoa[0]
    }else{
        return {}
    }

}

const findByName = async(connection, nomePessoa) => {
    const pessoa = await connection('pessoas').where({nome: nomePessoa}).select('*')
    return pessoa
}

const deleteOne = async(connection, idPessoa) => {
    await connection('pessoas').where({id: idPessoa}).delete()
}

const create = async(connection, data) => {
    await connection('pessoas').insert({
        nome: data.nome,
        nascimento: data.nascimento,
        cargo: data.cargo
    })
}

const update = async(connection, idPessoa, data) => {
    await connection('pessoas').where({id: idPessoa}).update({
        nome: data.nome,
        nascimento: data.nascimento,
        cargo: data.cargo
    })
}
module.exports = {
    findAll,
    findById,
    findByName,
    deleteOne,
    create,
    update
}