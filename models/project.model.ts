import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
	title: string
	slug: string
	description: string
	created_at: Date
	image: string
	category: mongoose.Schema.Types.ObjectId
	technologies: mongoose.Schema.Types.ObjectId[]
}

const ProjectSchema = new Schema<IProject>(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		created_at: { type: Date, default: Date.now },
		image: { type: String, required: true },
		category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
		technologies: [{ type: Schema.Types.ObjectId, ref: 'Technology' }],
	},
	{ timestamps: true }
)

export default mongoose.models.Project ||
	mongoose.model<IProject>('Project', ProjectSchema)
