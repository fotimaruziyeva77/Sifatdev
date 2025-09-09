import mongoose, { Schema, Document } from 'mongoose'

export interface ICategory extends Document {
	title: string
	created_at: Date
}

const CategorySchema = new Schema<ICategory>(
	{
		title: { type: String, required: true },
		created_at: { type: Date, default: Date.now },
	},
	{ timestamps: true }
)

export default mongoose.models.Category ||
	mongoose.model<ICategory>('Category', CategorySchema)
