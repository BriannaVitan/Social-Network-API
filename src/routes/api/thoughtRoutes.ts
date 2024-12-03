import { Router } from 'express';
const router = Router();
import { getAllThought, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController.js';

// /api/courses
// get and create route
router.route('/').get(getAllThought).post(createThought);

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thought/:thoughtId/reaction
// create and delete reactions routes 
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

export default router;
