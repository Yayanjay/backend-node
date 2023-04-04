const user = require('../models/user')
const respons = require('../helpers/response')
const passwordHash = require('../helpers/hash')
const bcr = require('bcrypt')
const jwt = require('jsonwebtoken')

class Auth {
    async commit(req, res) {
        try {
            const result = await user.commit()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }

    async drop(req, res) {
        try {
            const result = await user.drop()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }

    async token(username) {
        try {
            const payload = {
                user: username
            }
            console.log(username);
            const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: '1h' })
            const result = {
                message: 'token created, login success',
                token: token
            }
            return result
        } catch (error) {
            console.log("token not generated");
            throw error // melempar ke function yang memanggil
        }
    }

    async getAll(req, res) {
        try {
            const result = await user.getAll()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }

    async getById(req, res) {
        try {
            const result = await user.getById(req.params.id)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 400, error)
        }
    }

    async register(req, res) {
        try {
            const check = await user.getbyUsername(req.body.username)
            if (check.length > 0) {
                return respons(res, 400, { msg: "username sudah digunakan" })
            }

            const passHash = await passwordHash(req.body.password)
            const data = {
                username: req.body.username,
                email: req.body.email,
                password: passHash,
            }
            const result = await user.register(data)
            console.log(result)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 500, error)
        }
    }

    async login(req, res) {
        try {
            const passDB = await user.getbyUsername(req.body.username)
            if (passDB <= 0) {
                return respons(res, 400, { msg: 'username tidak terdaftar' })
            }

            const passUsers = req.body.password
            // console.log(passDB[0]);
            const check = await bcr.compare(passUsers, passDB[0].password)

            if (check) {
                const payload = {
                    user: req.body.username
                }
                const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: '1h' })
                const result = {
                    message: 'token created, login success',
                    token: token
                }
                return respons(res, 200, result)
            } else {
                return respons(res, 401, { msg: 'Password Salah' })
            }
        } catch (error) {
            return respons(res, 500, error)
        }
    }
}

module.exports = new Auth()