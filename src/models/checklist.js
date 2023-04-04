const db = require('../configs/db');
const sequelize = require('sequelize');

class Checklist {
    constructor() {
        this.Checklist = db.sequelize.define("checklist", {
            id: {
                type: sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: sequelize.STRING(50),
                allowNull: false,
            }
        })
    }

    commit() {
        return new Promise((resolve, reject) => {
            this.Checklist.sync()
                .then((result) => {
                    resolve("Checklist Table Successfully Created")
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    drop() {
        return new Promise((resolve, reject) => {
            this.Checklist.drop()
                .then((result) => {
                    resolve("Checklist Table Successfully Deleted")
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.Checklist.findAll({
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
            const checklist = await this.Checklist.findByPk(id)

            return checklist
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async addChecklist(data) {
        try {
            const profile = await this.Checklist.create(
                data
            )
            const { id, ...results } = profile.toJSON()
            return results
        } catch (error) {
            console.log(error)
            return error
        }
    }

    deleteChecklist(id) {
        return new Promise((resolve, reject) => {
            this.Checklist.destroy({
                where: {
                    id: id
                }
            })
                .then((res) => {
                    resolve("Data Successfully Deleted")
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                });
        })
    }

}

module.exports = new Checklist()