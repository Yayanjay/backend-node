const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/auth')

router.get('/commit', ctrlAuth.commit);
router.get('/drop', ctrlAuth.drop);

router.get('/', ctrlAuth.getAll);
router.get('/:id', ctrlAuth.getById);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
module.exports = router