# Daniel Moller - Portfolio Website

A personal portfolio website showcasing projects, work experience, and educational background.

**Live Site**: [danielmoller.co.za](https://danielmoller.co.za/)

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6)
- **Libraries**:
  - jQuery 3.4.1 for DOM manipulation
  - jQuery Transit for animations
  - ScrollMagic for scroll-based animations and parallax effects
  - imagesloaded for image loading detection
- **Deployment**: GitHub Pages with custom domain

## Local Development

This is a static site with no build process. To run locally:

```bash
# Start a simple HTTP server
python3 -m http.server 8000

# Open in browser
# http://localhost:8000
```

## Project Structure

```
/                       # Main portfolio page (index.html)
├── projects/           # Detailed projects gallery page
├── about_this_webpage/ # Meta page about the portfolio itself
├── weekly_ideas/       # Ideas/blog section
├── construction/       # Placeholder for under-construction pages
└── img/                # All images organized by feature
```

## Features

- **Responsive Design**: Mobile-first approach with breakpoints at 768px, 600px, and 500px
- **Scroll Animations**: ScrollMagic-powered fade-ins and sliding effects
- **Project Showcase**: Interactive project cards with detailed descriptions
- **Work Experience Timeline**: Visual timeline of past positions
- **Mobile Navigation**: Hamburger menu for mobile devices

## Deployment

The site is automatically deployed to GitHub Pages from the `master` branch. Any commits pushed to `master` will trigger an automatic deployment.

## Code Formatting

This project uses Prettier for code formatting with a 120-character line width:

```bash
npx prettier --write index.html
```

---

**Contact**: [LinkedIn](https://za.linkedin.com/in/daniel-moller-mechatronics)
