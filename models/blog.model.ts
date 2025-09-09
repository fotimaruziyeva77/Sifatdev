import mongoose, { Document, Schema } from 'mongoose'
import slugify from 'slugify'

export interface IBlog extends Document {
	title: string
	description: string
	image: string
	viewCount: number
	tags: mongoose.Types.ObjectId[]
	slug: string
}

const BlogSchema = new Schema<IBlog>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
		viewCount: { type: Number, default: 0 },
		tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
		slug: { type: String, unique: true },
	},
	{ timestamps: true }
)

BlogSchema.pre('validate', function (next) {
	if (this.title && !this.slug) {
		this.slug = slugify(this.title, { lower: true, strict: true })
	}
	next()
})

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
