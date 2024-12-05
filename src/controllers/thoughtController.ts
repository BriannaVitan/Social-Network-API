import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

/**
 * GET All thought / thought
 * @returns an array of thought
*/
export const getAllThought = async(_req: Request, res: Response) => {
    try {
        const thought = await Thought.find();
        res.json(thought);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET thought based on id /thought/:id
 * @param string id
 * @returns a single thought object
*/
export const getSingleThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId);
      if(thought) {
        res.json(thought);
      } else {
        res.status(404).json({
          message: 'Thought not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  /**
 * POST thought /thought
 * @param object username
 * @returns a create thought
*/
export const createThought = async (req: Request, res: Response) => {
  try {
      const thought = await Thought.create(req.body);
      res.json(thought);
  } catch (err) {
      res.status(500).json(err);
  }
}

  /**
 * POST thought /thought
 * @param object username
 * @returns an updated thought
*/


export const updateThought = async (req:Request, res: Response) => {
  try {
    const user = await Thought.findByIdAndUpdate({ _id: req.params.userId }, req.body, {new: true});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}


  /**
 * DELETE Course based on id /thought/:id
 * @param string id
 * @returns a delete thought
*/
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Thought created but no user with this id!' });
    }

    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }

  return;
}

/**
 * POST Assignment based on /user/:userId/addFriend
 * @param string id
 * @param object assignment
 * @returns add Reaction
*/

export const addReaction = async (req: Request, res: Response) => {
  console.log('You are adding a Reaction');
  console.log(req.body);
  try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
      );

      if (!thought) {
          return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
      }

      return res.json(thought);
  } catch (err) {
      return res.status(500).json(err);
  }
}

/**
* DELETE Assignment based on /user/:userId/addFriend
* @param string friendsId
* @param string userId
* @returns removes a Reaction
*/

export const removeReaction = async (req: Request, res: Response) => {
  try {
      const thought = await Thought.findOneAndUpdate(
          { 'reactions.reactionId': req.params.reactionId  },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
      );

      if (!thought) {
          return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
      }

      return res.json(thought);
  } catch (err) {
      return res.status(500).json(err);
  }
}

export default Thought;