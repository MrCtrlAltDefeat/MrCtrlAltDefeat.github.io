# kareem-portfolio

Personal portfolio site — hacker-themed, deployed on GitHub Pages.

**Live:** https://MrCtrlAltDefeat.github.io/

## Stack

- Pure HTML / CSS / JS — zero dependencies, zero build step
- GitHub Actions for automatic deployment on push to `main`
- GitHub Pages hosting

## Local preview

```bash
# Just open the file — no server needed
open index.html
```

Or with a local server:

```bash
npx serve .
```

## Deploy

Pushes to `main` automatically trigger the GitHub Actions workflow and deploy to Pages.

Make sure GitHub Pages is configured in your repo settings:
- **Settings → Pages → Source → GitHub Actions**
