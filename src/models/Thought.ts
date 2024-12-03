import { Schema, model, Document } from 'mongoose';
import ReactionSchema from './Reaction';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Schema.Types.Date,
    username: string,
    reactions: [typeof ReactionSchema]
}

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
        min_length: 1,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: (timeStamp: any) => timeStamp
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
},
    {
        toJSON: {
            getters: true,
        },
        timestamps: true
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema);

export default Thought;
