import mongoose, { Document, Schema } from 'mongoose'

export interface IVacancy extends Document {
	title: string
	description: string
	pricing: string
	workingDays: string
	workingTimes: string
}

const VacancySchema = new Schema<IVacancy>(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		pricing: {
			type: String,
			required: true,
		},
		workingDays: {
			type: String,
			required: true,
		},
		workingTimes: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

export default mongoose.models.Vacancy ||
	mongoose.model<IVacancy>('Vacancy', VacancySchema)
