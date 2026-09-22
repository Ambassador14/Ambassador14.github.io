# Samuel Yokwe Keri Wilson — Portfolio

My personal portfolio site: a one-page site with sections for About, Work Experience, Projects, Skills, Education and Contact. Built as plain HTML, CSS and JavaScript, hosted for free on GitHub Pages.

**Live site:** https://ambassador14.github.io *(update this if you rename the repository)*

## What's on the site

- **About** — a short introduction: who I am, what I study, and what I've worked on.
- **Work experience** — my role as Branch Manager at Shamrock Casinos Co. Ltd.
- **Projects** — Guardian, an AI safety app I led, plus other projects I'm building (KuluPay, Marhaba Bookings, Adverse, Creators' Hub).
- **Skills** — frontend development, AI prompt engineering, research and analysis, product design and management, basic cybersecurity.
- **Education** — every school I've attended, from GreenAcres Junior Academy in 2010 to the University of Juba today, each with its badge, years, and photos where I have them.
- **Languages and interests** — English, Kakwa, simple Arabic; teamwork, reading, writing, learning new skills.
- **Contact** — email, phone and location.

## How it's built

No frameworks, no build step, no dependencies to install.

| File | Purpose |
|---|---|
| `index.html` | Page structure. Section content is filled in by JavaScript at load time. |
| `assets/style.css` | All styling: layout, colours, fonts, the photo lightbox, responsive rules. |
| `assets/app.js` | Reads `schools/schools.json` and builds every section of the page from it. |
| `assets/images/profile.jpg` | Profile photo shown in the header. |
| `schools/schools.json` | **The single source of content.** About text, experience, skills, projects, languages, interests, contact details, and all six schools with their years, colours and photo captions. |
| `schools/<nn-school-name>/` | Each school's `badge.jpg`, a `photos/` folder, and `website.txt` where the school has a site. |
| `cv/` | My CV. Kept out of the published site by `.gitignore`, since it has personal details (ID number, date of birth, parents' names) that don't belong on a public page. |

## Updating the content

Everything on the page comes from `schools/schools.json`, so most changes don't need touching the HTML, CSS or JS at all:

- **Edit text** (About, a job, a skill, a project) — open `schools.json` on GitHub, click the pencil icon, edit, commit.
- **Add a project or skill** — add an entry to the `projects` or `skills` list in `schools.json`.
- **Add a photo to a school** — upload the image into that school's `photos/` folder, then add `{ "src": "path/to/image.jpg", "alt": "description" }` to that school's `photos` list in `schools.json`.
- **Change the profile photo** — replace `assets/images/profile.jpg` with a new image of the same name, or update the `photo` path in `schools.json`.

The site re-reads `schools.json` every time it loads, so a commit is all it takes — no rebuild.

## Running it locally

Because the page loads `schools.json` with `fetch`, opening `index.html` directly in a browser won't work (browsers block that for local files). Start a local server from this folder instead:

```
python3 -m http.server
```

Then open http://localhost:8000.

## Publishing on GitHub Pages

1. Create a repository. For the address `yourusername.github.io`, the repository name must match your GitHub username exactly.
2. Upload everything in this folder **except** `cv/` (already excluded by `.gitignore`).
3. In the repository, go to **Settings > Pages**, set Source to "Deploy from a branch", choose `main` and `/ (root)`, and save.
4. The site goes live at your Pages address within a minute or two.

## What's intentionally left off the public site

My National ID number, parents' names, religion, and my referees' contact details are on my CV but not shown here, since this page is public.
