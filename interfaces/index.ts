export interface ServiceTypes {
	title: string
	slug: string
	_id: string
	description: string
	icon: string
	createdAt: string
}

export interface ProjectTypes {
	_id: string
	title: string
	description: string
	image: string
	category: { _id: string; title: string }
	technologies: { _id: string; name: string }[]
	slug: string
}

export interface VacancyTypes {
	_id: string
	title: string
	description: string
	pricing: string
	workingDays: string
	workingTimes: string
	createdAt: string
}

export interface TagTypes {
	_id: string
	name: string
}

export interface BlogTypes {
	_id: string
	title: string
	slug: string
	description: string
	image: string
	viewCount: number
	tags: TagTypes[]
	createdAt: string
}

export interface SkillTypes {
	_id: string
	name: string
	createdAt: string
}

export interface ResumeTypes {
	_id: string
	senderName: string
	phoneNumber: string
	vacancy: string
	cv: string
	createdAt: string
	updatedAt: string
	__v: number
}
