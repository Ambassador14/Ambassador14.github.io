# The schools I've attended – GitHub Pages portfolio

A one-page site showing every school attended, in order, with badges and photos. One folder per school in `schools/`; `schools/schools.json` is the data file `index.html` reads.

## Site files
- `index.html`, `assets/style.css`, `assets/app.js` – the page
- `schools/schools.json` – everything the page shows: about text, work experience, languages, interests, email, and the schools with years, accent colours and photo captions. Add entries to `projects` and `skills` to switch those (currently hidden) sections on. To add a photo: drop the file in that school's `photos/` folder and add `{ "src": "...", "alt": "..." }` to its `photos` list.
- `.gitignore` – keeps the `cv/` folder out of the repository (the CV has personal details that shouldn't be public)

## Publishing on GitHub Pages
1. Create a repository (for a `username.github.io` address, name it exactly `username.github.io`).
2. Upload everything in this folder. `cv/` is excluded by `.gitignore`.
3. In the repository, go to Settings > Pages, choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. The site appears at the Pages address after a minute or two.

To preview on your computer, run `python3 -m http.server` in this folder and open http://localhost:8000. Opening `index.html` directly won't load the data.

## Layout
```
github-portfolio/
├── README.md
├── cv/CURRICULUM_VITA_Sam.docx
└── schools/
    ├── schools.json
    ├── 01-greenacres-junior-academy/       (badge.jpg, photos/, website.txt)
    ├── 02-bombo-trinity-primary/           (badge.jpg, photos/)
    ├── 03-bombo-senior-secondary-school/   (badge.jpg, photos/, website.txt)
    ├── 04-arua-town-college/               (photos/)
    ├── 05-golden-high-school/              (badge.jpg, photos/)
    └── 06-university-of-juba/              (badge.png, photos/, website.txt)
```
Convention per school: `badge.jpg`/`badge.png` (crest/logo), `photos/` (campus and event pictures), `website.txt` (school site).

## Status
| # | School | Years | Badge | Photos | Website |
|---|---|---|---|---|---|
| 1 | GreenAcres Junior Academy Primary | 2010-2013 | ✅ | 4 | ✅ |
| 2 | Bombo Trinity Day and Boarding Primary | 2014-2015 | ✅ | none available | none |
| 3 | Bombo Senior Secondary (Senior 1-2) | 2016-2017 | ✅ | 1 | ✅ |
| 4 | Arua Town College (Senior 3-4) | 2018-2019 | none found (placeholder) | 1 | none |
| 5 | Golden High Secondary | 2022 | ✅ | none available | none |
| 6 | University of Juba | 2024-2028 (expected) | ✅ | 4 | ✅ |

Note: the CV lists Arua Town College as 2016-2019 and omits Bombo Senior Secondary; the portfolio uses the corrected dates (Bombo SSS 2016-2017, Arua 2018-2019).

## Upload log
1. CV, Bombo SSS campus photo, logo, website
2. GreenAcres Junior Academy photos, logo, website; University of Juba gate photo
3. University of Juba photos (stone building, admin building, graduate statue) and website
4. Reorganised into per-school folders and added schools.json
5. Bombo Trinity badge added (school has no website or campus photos)
6. Arua Town College group photo added
7. University of Juba badge added
8. Golden High badge added (embroidered crest photo; no other images found)
9. Arua Town College: no badge could be found, marked as final (site will use a placeholder)
10. Confirmed Bombo Senior Secondary School as attended; waiting on years to place it in the timeline
11. Bombo Senior Secondary placed in timeline (Senior 1-2, 2016-2017); folders renumbered
12. Arua Town College confirmed as Senior 3-4 (2018-2019); overlap with Bombo SSS resolved
13. Built the site (index.html, assets/, schools.json extended with accent colours and photo captions)
14. Site expanded to a full personal portfolio (about, experience, education, languages and interests, contact). Left out on purpose: National ID number, date of birth, phone, parents' names, religion, marital status and referees' contact details
15. Added phone number, date of birth and marital status to the Contact section at the owner's request. Still left out: National ID number, parents' names, religion, referees' contact details
16. Skills section switched on (frontend, AI prompt engineering, research and analysis, product design and management, basic cybersecurity)
17. Projects section switched on (Guardian, KuluPay, Marhaba Bookings, Adverse, Creators' Hub); descriptions and links still to add
18. Guardian project card completed with description and GitHub link
19. Added profile photo to the hero (assets/images/profile.jpg) alongside a redesigned header: portfolio pill, watermark-style layout, framed rotated photo, accent title tag
