const model = require('../models/checklist')
const respons = require('../helpers/response')

class Checklist {
    async commit(req, res) {
        try {
            const result = await model.commit()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }

    async drop(req, res) {
        try {
            const result = await model.drop()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }

    async getAll(req, res) {
        try {
            const result = await model.getAll()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }

    async getById(req, res) {
        try {
            const result = await model.getById(req.params.id)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 400, error)
        }
    }

    async addChecklist(req, res) {
        try {

            const result = await model.addChecklist(req.body)
            return respons(res, 200, { msg: 'successfully add checklist', data: result })
        } catch (error) {
            console.log(error);
            return respons(res, 500, error)
        }
    }

    async deleteChecklist(req, res) {
        try {
            const result = await model.deleteChecklist(req.params.id)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 400, error)
        }
    }

}

module.exports = new Checklist()