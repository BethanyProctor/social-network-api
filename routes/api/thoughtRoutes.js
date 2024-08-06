const router = require('express').Router()
const { getThoughts, getOneThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtControllers')

//localhost:3001/api/thoughts/
router.route('/').get(getThoughts).post(createThought)
router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought)
router.route('/:id/reactions').post(addReaction)
router.route('/:id/reactions/:reactionId').delete(deleteReaction)

module.exports = router