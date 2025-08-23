import { Trophy, Users, MessageSquare, FolderOpen } from "lucide-react";

export const langs = [
	{ route: 'en', label: 'EN' },
	{ route: 'uz', label: "UZ" },
	{ route: 'ru', label: 'РУ' },
]

export const link = [
	{
		navlink: 'Help',
		href: '/help',
	},
	{
		navlink: 'Support',
		href: '/contact',
	},
	{
		navlink: 'Faqs',
		href: '/faqs',
	},
]

export const stats = [
	{ icon: Trophy, number: "15+", label: "Yirik IT mukofotlari" },
	{ icon: Users, number: "25+", label: "Tajribali jamoa a'zolari" },
	{ icon: MessageSquare, number: "200+", label: "Mamnun mijozlar sharhlari" },
	{ icon: FolderOpen, number: "50+", label: "Muvaffaqiyatli yakunlangan loyihalar" },
];
export interface Teams {
  id: number;
  full_name: string;
  photo: string;
  telegram: string;
  instagram: string;
  github: string;
  linkedin: string;
}
export interface Blogs {
  id: number;
  category: Category;
  date: string;
  title: string;
  slug: string;
  description: string;
  face_image: string;
  views_count: number;
}

export interface Category {
  id: number;
  title: string;
}
export interface Services {
  id:number
  title: string;
  short_description: string;
  description: string;
  logo: string;
}