# API Endpoints

> Below are all available endpoints.  
> **Public** – No authentication required
> **Private** – For admin only

---

Auth
**`POST`** `/api/auth` – Admin login (Public)

---

Blogs
**`GET`** `/api/blogs` – Get all blogs (Public)  
**`POST`** `/api/blogs` – Create new blog (Private)  
**`GET`** `/api/blogs/[slug]` – Get blog by slug (Public)  
**`PUT`** `/api/blogs/[slug]` – Update blog by slug (Private)  
**`PATCH`** `/api/blogs/[slug]` – Update blog by slug (Private)  
**`DELETE`** `/api/blogs/[slug]` – Delete blog by slug (Private)

---

Tags
**`GET`** `/api/tags` – Get all tags (Public)  
**`POST`** `/api/tags` – Create new tag (Private)  
**`GET`** `/api/tags/[id]` – Get tag by ID (Public)  
**`PUT`** `/api/tags/[id]` – Update tag (Private)  
**`PATCH`** `/api/tags/[id]` – Update tag (Private)  
**`DELETE`** `/api/tags/[id]` – Delete tag (Private)

---

Vacancies
**`GET`** `/api/vacancies` – Get all vacancies (Public)  
**`POST`** `/api/vacancies` – Create new vacancy (Private)  
**`GET`** `/api/vacancies/[id]` – Get vacancy by ID (Public)  
**`PUT`** `/api/vacancies/[id]` – Update vacancy (Private)  
**`PATCH`** `/api/vacancies/[id]` – Update vacancy (Private)  
**`DELETE`** `/api/vacancies/[id]` – Delete vacancy (Private)

---

Projects
**`GET`** `/api/projects` – Get all projects (Public)  
**`POST`** `/api/projects` – Create new project (Private)  
**`GET`** `/api/projects/[slug]` – Get project by slug (Public)  
**`PUT`** `/api/projects/[slug]` – Update project (Private)  
**`PATCH`** `/api/projects/[slug]` – Update project (Private)  
**`DELETE`** `/api/projects/[slug]` – Delete project (Private)

---

Technologies
**`GET`** `/api/technologies` – Get all technologies (Public)  
**`POST`** `/api/technologies` – Create new technology (Private)  
**`GET`** `/api/technologies/[id]` – Get technology by ID (Public)  
**`PUT`** `/api/technologies/[id]` – Update technology (Private)  
**`PATCH`** `/api/technologies/[id]` – Update technology (Private)  
**`DELETE`** `/api/technologies/[id]` – Delete technology (Private)

---

Categories
**`GET`** `/api/categories` – Get all categories (Public)  
**`POST`** `/api/categories` – Create new category (Private)  
**`GET`** `/api/categories/[id]` – Get category by ID (Public)  
**`PUT`** `/api/categories/[id]` – Update category (Private)  
**`PATCH`** `/api/categories/[id]` – Update category (Private)  
**`DELETE`** `/api/categories/[id]` – Delete category (Private)

---

Services
**`GET`** `/api/services` – Get all services (Public)  
**`POST`** `/api/services` – Create new service (Private)  
**`GET`** `/api/services/[slug]` – Get service by slug (Public)  
**`PUT`** `/api/services/[slug]` – Update service (Private)  
**`PATCH`** `/api/services/[slug]` – Update service (Private)  
**`DELETE`** `/api/services/[slug]` – Delete service (Private)

---

Services Contact
**`POST`** `/api/services-contact` – Create service contact (Public, contact form)

---

Contact
**`POST`** `/api/contact` – Send contact form (Public)

---

About (under construction)
**`GET`** `/api/about` – Get about info (Public)  
**`POST`** `/api/about` – Update about info (Private)

---

Upload
**`POST`** `/api/upload` – Upload a file and get its URL (Private)

---
