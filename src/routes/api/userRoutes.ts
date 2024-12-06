import { Router } from 'express';
const router = Router();
import { getAllUser, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';
// /api/user
// get route and create
router.route('/').get(getAllUser).post(createUser);
// /api/user/:userId
// update and delete route
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// /api/user/:userId/friend
// creating and deleting friend
router.route('/:userId/friend').post(addFriend).delete(removeFriend);
export default router;