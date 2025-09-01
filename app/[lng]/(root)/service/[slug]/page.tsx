"use client";

import { useState } from "react";

export default function ServiceSlug() {
  const [formData, setFormData] = useState({
    company: "",
    fullname: "",
    phone: "+998",
    projectType: "Veb-sayt",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form yuborildi:", formData);
  };

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center text-gray-300">
          <p className="text-sm uppercase text-emerald-400 tracking-wider mb-2">
            Sizning raqamli hamkoringiz
          </p>
          <h1 className="text-3xl font-bold mb-4">Veb-saytlar</h1>
          <p className="text-gray-400 text-sm">
            Ushbu birlamchi ma’lumotlarni to‘ldirganingizdan so‘ng bizning mas’ul xodimlarimiz siz bilan aloqaga chiqishadi.
          </p>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className="bg-[#1c1c1c] p-6 rounded-xl shadow-lg flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              placeholder="Kompaniya nomini kiriting"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              name="fullname"
              placeholder="Ismingizni kiriting"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-black px-3 py-3 rounded-l-lg border border-gray-700">🇺🇿 +998</span>
              <input
                type="text"
                name="phone"
                placeholder="Telefon raqamingiz"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-r-lg bg-black text-white border border-gray-700 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <select
              name="projectType"
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="Veb-sayt">Veb-sayt</option>
              <option value="Mobil ilova">Mobil ilova</option>
              <option value="CRM tizim">CRM tizim</option>
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Loyiha tavsifi"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:border-emerald-500 h-28"
          />

          <button
            type="submit"
            className="bg-emerald-500 text-white font-semibold py-3 rounded-lg hover:bg-emerald-600 transition"
          >
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
}
