const db = require('../configs/db');
const sequelize = require('sequelize');

class User {
    constructor() {
        this.User = db.sequelize.define("users", {
            id: {
                type: sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: sequelize.STRING(50),
                allowNull: false,
            },
            email: {
                type: sequelize.STRING(50),
                allowNull: false,
            },
            password: {
                type: sequelize.STRING(),
                allowNull: false,
            },
        })
    }

    commit() {
        return new Promise((resolve, reject) => {
            this.User.sync()
                .then((result) => {
                    resolve("User Table Successfully Created")
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    drop() {
        return new Promise((resolve, reject) => {
            this.User.drop()
                .then((result) => {
                    resolve("User Table Successfully Deleted")
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.User.findAll({
                order: [['id', 'ASC']],
                // attributes: { exclude: ['id'] }
            })
                .then((res) => {
                    if (res.length == 0) {
                        resolve({ note: "This Table is Empty" })
                    } else {
                        resolve(res)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    async getById(id) {
        try {
            const user = await this.User.findByPk(id)

            return user
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getbyUsername(username) {
        try {
            const user = await this.User.findAll({
                order: [['createdAt', 'DESC']],
                where: {
                    username
                }
            })
            return user
        } catch (error) {
            console.log(error)
            return error
        }
        return new Promise((resolve, reject) => {
            this.table
                .findAll({
                    order: [['createdAt', 'DESC']],
                    where: {
                        username
                    }
                })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }


    Save(data) {
        return new Promise((resolve, reject) => {
            this.table
                .create(data)
                .then((res) => {
                    resolve(res.toJSON())
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    async register(data) {
        try {
            const user = await this.User.create(
                data
            )
            const { id, ...results } = user.toJSON()
            return results
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async updateUser(userId, data) {
        try {
            const res = await this.User.update(data, { where: { id: userId } });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

}

module.exports = new User()