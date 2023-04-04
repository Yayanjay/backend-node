const express = require('express');
const router = express.Router();
const ctrlChecklist = require('../controllers/checklist')
const validate = require("../middlewares/validate")

router.get('/commit', ctrlChecklist.commit);
router.get('/drop', ctrlChecklist.drop);

router.get('/', validate(), ctrlChecklist.getAll);
router.post('/', validate(), ctrlChecklist.addChecklist);
router.delete('/:id', validate(), ctrlChecklist.deleteChecklist);

module.exports = router