import mongoose, { Schema, Document } from 'mongoose'

export interface ITechnology extends Document {
	name: string
	created_at: Date
}

const TechnologySchema = new Schema<ITechnology>(
	{
		name: { type: String, required: true },
		created_at: { type: Date, default: Date.now },
	},
	{ timestamps: true }
)

export default mongoose.models.Technology ||
	mongoose.model<ITechnology>('Technology', TechnologySchema)
