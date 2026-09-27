# Kareem Mahmoud: Engineering Portfolio

A responsive, animated portfolio for the existing `MrCtrlAltDefeat.github.io` repository.

## Preview

Open `index.html` directly, or serve this folder with:

```sh
python -m http.server 4173
```

Then visit http://localhost:4173. Direct file preview works; the optional repository feed uses `repos.json` when served over HTTP. A static fallback remains available offline. The site uses plain HTML, CSS, and JavaScript, with no install or build step. Google Fonts are optional; system fonts are the fallback.

## Included

- About and education
- 15 curated projects: all 13 supplied project titles, plus the home lab and NFS lab from the CV
- BetaIT and Fun Robotics experience
- Skills across networks, security, cloud, software, and embedded systems
- Leadership and community roles
- Certifications, coursework, and competition participation
- Contact links
- Animated engineering diagram, section reveals, hover states, accessible project expanders, mobile navigation, motion toggle, and reduced-motion support
- Existing GitHub repository feed and sync workflow preserved

## Publish to GitHub Pages

Target repository: https://github.com/MrCtrlAltDefeat/MrCtrlAltDefeat.github.io
Expected URL: https://mrctrlaltdefeat.github.io/

This folder is a clone of your existing repository. The redesign is local until committed and pushed through your authenticated GitHub account.

From this folder:

```sh
git add index.html styles.css case-studies.css minimal.css opening.css opening.js script.js assets projects .nojekyll .gitignore README.md .github/workflows/deploy.yml
git commit -m "Redesign engineering portfolio"
git push origin main
```

In the GitHub repository, select **Settings → Pages → Source → GitHub Actions**. The included workflow publishes on pushes to `main`. Wait for **Deploy Portfolio to GitHub Pages** to succeed in the Actions tab before treating the redesign as live.

If using the ZIP instead, extract it, then copy its files into your existing repository, including the `.github` folder. Do not upload the ZIP itself as the website. Commit and push as above.

The deployment stages only public website files. The existing scheduled repository-sync workflow remains unchanged.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Edit content

- `index.html`: text, project descriptions, sections, and links. All core content is readable without JavaScript.
- `styles.css`: colors, typography, animation, desktop and mobile layouts.
- `case-studies.css`: project gallery and detailed story layouts.
- `projects/`: five detailed project stories with source excerpts.
- `assets/projects/`: original screenshots, four implementation diagrams, and the project recording.
- `script.js`: menu, motion preference, section highlighting, and extra repositories.
- `repos.json`: existing repository feed, updated by the existing GitHub Actions workflow.

To add a project, duplicate a `.project-row` entry and update its title, category, description, technologies, and verified repository link. Featured cards use `.project-card`.

## Content provenance and pending information

Professional experience, education, technical skills, and the two infrastructure/security labs are based on the supplied CV. Project titles and the Red Palm Weevil expansion are from your messages. Public repository links were checked against the GitHub profile and existing repository data. Community roles and additional credentials are retained from your existing public portfolio.

RH124 is presented as coursework, not an RHCSA certification. A2RL is presented as participation, not a prize. Specific volunteer roles and prizes from LinkedIn remain deferred at your request. No awards, dates, outcomes, or repository URLs were invented for the projects described only by title.

When those details are ready, add dedicated Volunteer and Prizes sections next to Community and Credentials. Add certificate links and project reports when available.

## LinkedIn: deferred

After the redesign is published, use https://mrctrlaltdefeat.github.io/ for your portfolio link. Suggested title: **Kareem Mahmoud | Computer Engineering Portfolio**. Suggested description: **Projects in cybersecurity, embedded systems, full-stack development, and cloud infrastructure, alongside my engineering experience at AUS.**

No LinkedIn profile changes have been made.


## Project evidence update

Five detailed stories now cover SmartExpense, the Dark Pattern Detector, Foodo, the producer-consumer system, and the NFS security lab. The landing page links to each story.

Visuals include the supplied extension screenshot, an original Nmap scan excerpt from the security walkthrough, four SVG implementation diagrams, and the original producer-consumer recording (3 minutes 38 seconds, approximately 21 MB). The video loads on demand and has a source-based written walkthrough. It does not include a verbatim caption transcript.

The diagrams are created from source code and are labeled as diagrams, not application screenshots. Code excerpts include their source filenames and line numbers. The detector study is described as planned; Foodo's impact fields are distinguished from measured outcomes and its unfinished dashboard. Team attribution is retained where the report identifies collaborators. Student IDs and full reports are not included.

Sources used:
- `darkpattern-ext/scripts/content.js`, its screenshot, and the Fall 2025 progress report.
- `smartexpense/backend/main.py`, dashboard source, and README.
- Foodo's batch, pickup, impact, and order models, plus dashboard XML.
- `producer_consumer.c`, the mini-project report, and demonstration recording.
- `Security Project Demo Explanation.docx`.

This remains a local review version. No deployment or LinkedIn update has been performed.


## Minimal design update

The light theme uses system typography, neutral surfaces, blue accents, generous spacing, and restrained motion. All existing page text, links, and code were checked against the previous version and preserved. Two generated conceptual project covers were added; original project images and the video remain. The vector diagrams were recolored without changing their labels or geometry. See ILLUSTRATIONS.md for asset paths and generation prompts. The shared visual overrides are in minimal.css.

## Opening sequence

The landing page holds “Hi” until the visitor scrolls. Scrolling progressively reveals the introduction, then naturally brings navigation and About into view; scrolling back reverses the reveal. Direct section links skip the intro, and a keyboard-accessible Skip to content link is available. Reduced-motion preferences disable the greeting’s scaling effect. Earlier background details remain in the expandable background section. `opening.css` and `opening.js` control this sequence.


Projects use a unified 15-card responsive catalog. Original documents are downloadable from the relevant cards and detail pages under assets/resources; the senior design report is intentionally excluded. Existing overview information remains available on the project detail pages. Projects stays selected in the navigation throughout each detail page.
