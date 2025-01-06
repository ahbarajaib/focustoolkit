import { model, Model, Schema, Types } from 'mongoose'

interface ITimeBlock {
    userId: Types.ObjectId;
    title: string;
    startTime: Date;
    endTime: Date;
    duration?:number,
    isRecurring: boolean;
    recurrencePattern?: string;
    alertBefore?: number;
    isCompleted: boolean;
}

type TimeBlockModel = Model<ITimeBlock>
const timeBlockSchema: Schema<ITimeBlock, TimeBlockModel> = new Schema<ITimeBlock, TimeBlockModel>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration:{type:Number},
    isRecurring: { type: Boolean, default: false },
    recurrencePattern: { type: String, default: null },
    alertBefore: { type: Number, default: null },
    isCompleted: { type: Boolean, default: false }
}, {
    timestamps: true
})



const TimeBlock: TimeBlockModel = model<ITimeBlock, TimeBlockModel>('TimeBlock', timeBlockSchema)
export default TimeBlock;