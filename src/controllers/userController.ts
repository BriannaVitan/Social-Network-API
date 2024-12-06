import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
import { User } from '../models/index.js';
/**
 * GET ALL user/ user
 * @returns an array of user
*/
export const getAllUser = async (_req: Request, res: Response) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}
/**
 * GET User based on id /user/:id
 * @param string id
 * @returns a single user object
*/
export const getSingleUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * POST user / user
 * @param object user
 * @returns a create user
*/
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
 
/** 
* POST user / user
 * @param object user
 * @returns a create user
*/
export const updateUser = async (req:Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate({ _id: req.params.userId }, req.body, {new: true});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
/**
 * DELETE user based on id /user/:id
 * @param string id
 * @returns a delete user
*/
export const deleteUser = async (req:Request, res: Response) => {
    try {
      await User.findByIdAndDelete({ _id: req.params.userId })
      res.status(200).json('Deleted successfully!')
    } catch (err) {
      res.status(500).json(err);
    }
  }

/**
 * POST Assignment based on /user/:userId/addFriend
 * @param string id
 * @param object assignment
 * @returns add Friend
*/
export const addFriend = async (req:Request, res: Response) => {
    try {
      const friend = await User.findOneAndUpdate({email:req.body.email}, req.body);
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { friends: friend } }, {new: true});

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
/**
 * DELETE Assignment based on /user/:userId/addFriend
 * @param string friendsId
 * @param string userId
 * @returns removes a friend
*/
export const removeFriend = async (req:Request, res: Response) => {
    try {
      const friend = await User.findById(req.params.userId);

      if (!friend) {
        return res.status(404).json({ message: 'No friend with that ID' });
      }
  
      // Remove the friend reference from the user
      await User.updateMany(
        { friends: friend._id },
        { $pull: { friends: friend._id } }
      );
  
      return res.status(200).json({ message: 'Friend deleted!' });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
export default {getAllUser, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend};