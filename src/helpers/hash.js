const bcr = require("bcrypt")

async function hashPassword(password) {
    try {
        const salt = await bcr.genSalt(10)
        const result = await bcr.hash(password, salt)
        return result
    } catch (error) {
        console.log('fail to hash');
        throw error
    }
}

module.exports = hashPassword
