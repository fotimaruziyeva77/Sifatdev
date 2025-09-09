import mongoose, { Document, Schema } from 'mongoose'

export interface IService extends Document {
	title: string
	description: string
	icon: string
	slug: string
}

const ServiceSchema = new Schema<IService>(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: false,
		},
		slug: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

export default mongoose.models.Service ||
	mongoose.model<IService>('Service', ServiceSchema)
