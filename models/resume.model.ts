import mongoose, { Document, Schema } from 'mongoose'

export interface IResume extends Document {
	senderName: string
	phoneNumber: string
	vacancy: string
	cv: string
}

const ResumeSchema = new Schema<IResume>(
	{
		senderName: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		vacancy: {
			type: String,
			required: true,
		},
		cv: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

export default mongoose.models.Resume ||
	mongoose.model<IResume>('Resume', ResumeSchema)
