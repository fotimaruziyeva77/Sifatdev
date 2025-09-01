// import { CalendarDays, Clock } from "lucide-react";

// type JobDetail = {
//   title: string;
//   days: string;
//   time: string;
//   requirements: string[];
//   tasks: string[];
//   conditions: string[];
// };

// const jobDetails: Record<string, JobDetail> = {
//   "ui-ux-designer": {
//     title: "🎇 Middle UI/UX designer",
//     days: "Monday - Friday",
//     time: "09:00 - 18:00",
//     requirements: [
//       "Experience in UI/UX design",
//       "Knowledge of Sketch, Figma, Adobe Family, etc.",
//       "Understanding typography, color scheme, visual hierarchy",
//       "Experience in mobile layouts",
//       "Strong communication skills",
//     ],
//     tasks: [
//       "Develop UI layouts considering modern design trends",
//       "Create prototypes and visualizations",
//       "Work with product team and developers",
//       "Conduct UI testing and optimize UX",
//       "Participate in branding process",
//     ],
//     conditions: [
//       "Schedule 5/2, 09:00 - 18:00",
//       "Corporate education and trainings",
//       "Friendly, supportive team atmosphere",
//       "Modern office and equipment",
//       "Timely salary + bonuses",
//     ],
//   },
//   "backend-software-engineer": {
//     title: "Middle Backend Software Engineer",
//     days: "Monday - Friday",
//     time: "09:00 - 18:00",
//     requirements: ["Backend experience", "Knowledge of databases", "API design"],
//     tasks: ["Develop backend systems", "Optimize performance", "Work with frontend team"],
//     conditions: ["Stable salary", "Modern office", "Professional team"],
//   },
//   "flutter-software-engineer": {
//     title: "Middle Flutter Software Engineer",
//     days: "Monday - Friday",
//     time: "09:00 - 18:00",
//     requirements: ["Flutter experience", "Dart knowledge", "Mobile development skills"],
//     tasks: ["Build cross-platform apps", "Maintain existing apps", "Collaborate with designers"],
//     conditions: ["Training provided", "Bonuses available", "Remote option"],
//   },
// };

// export default function JobDetail({ params }: { params: { slug: string } }) {
//   const job = jobDetails[params.slug];

//   if (!job) {
//     return <div className="text-white p-6">Job not found</div>;
//   }

//   return (
//     <div className="bg-gray-900 min-h-screen text-white p-6">
//       <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-6 shadow-lg">
//         {/* Title */}
//         <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
//         <div className="flex gap-4 text-gray-400 mb-6">
//           <div className="flex items-center gap-2">
//             <CalendarDays className="w-4 h-4" />
//             {job.days}
//           </div>
//           <div className="flex items-center gap-2">
//             <Clock className="w-4 h-4" />
//             {job.time}
//           </div>
//         </div>

//         {/* Sections */}
//         <div className="space-y-6">
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Requirements</h2>
//             <ul className="list-disc list-inside text-gray-300">
//               {job.requirements.map((req: string, i: number) => (
//                 <li key={i}>{req}</li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-2">Tasks</h2>
//             <ul className="list-disc list-inside text-gray-300">
//               {job.tasks.map((task: string, i: number) => (
//                 <li key={i}>{task}</li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-2">Conditions</h2>
//             <ul className="list-disc list-inside text-gray-300">
//               {job.conditions.map((cond: string, i: number) => (
//                 <li key={i}>{cond}</li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Button */}
//         <button className="mt-6 px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold">
//           Send resume
//         </button>
//       </div>
//     </div>
//   );
// }
