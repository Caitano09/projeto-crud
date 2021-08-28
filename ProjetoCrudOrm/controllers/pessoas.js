const index = async ({ Pessoa }, req, res) => {
    const pageSize = req.query.pageSize || 50
    const currentPage = req.query.page || 0
    const offset = currentPage * pageSize
    const total = await Pessoa.count()
    const totalPages = Math.ceil(total / pageSize)

    pessoas = await Pessoa.findAll({ offset: offset, limit: pageSize })

    res.render('pessoas/index', { 
        data: pessoas,
        pagination: {
            pages: totalPages,
            pageSize,
            currentPage: parseInt(currentPage)
        }
    })
}

const createForm = (req, res) => {
    res.render('pessoas/create')
}

const createProcess = async ({ Pessoa }, req, res) => {
    await Pessoa.create(req.body)
    res.redirect('/pessoas')
}

const deleteOne = async ({ Pessoa }, req, res) => {
    await Pessoa.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/pessoas')
}

const editForm = async ({ Pessoa }, req, res) => {
    const pessoa = await Pessoa.findByPk(req.params.id)
    res.render('pessoas/edit', { pessoa })
}

const editProcess = async ({ Pessoa }, req, res) => {
    await Pessoa.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.redirect('/pessoas')
}

const search = async ({ Pessoa }, req, res) => {
    pessoas = await Pessoa.findAll({ where: { nome: req.query.nome } })
    res.render('pessoas/search', { pessoas })
}

module.exports = {
    index,
    createForm,
    createProcess,
    deleteOne,
    editForm,
    editProcess,
    search
}