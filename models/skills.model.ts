import mongoose, { Document, Schema } from 'mongoose'

export interface ISkills extends Document {
	name: string
}

const SkillsSchema = new Schema<ISkills>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
)

export default mongoose.models.Tag ||
	mongoose.model<ISkills>('Skills', SkillsSchema)
