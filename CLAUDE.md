# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Daniel Moller, built as a static site with vanilla HTML, CSS, and JavaScript. The site showcases projects, work experience, and educational background. It's deployed via GitHub Pages at https://danielmoller.co.za/.

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6)
- **Libraries**:
  - jQuery 3.4.1 for DOM manipulation
  - jQuery Transit for animations
  - ScrollMagic for scroll-based animations and parallax effects
  - imagesloaded for image loading detection
- **Deployment**: GitHub Pages (CNAME file points to danielmoller.co.za)
- **No Build Process**: This is a static site with no build step or package manager

## Project Structure

The site follows a multi-page structure where each section/feature has its own subdirectory:

```
/                       # Root contains main portfolio page (index.html)
├── projects/           # Detailed projects gallery page
├── about_this_webpage/ # Meta page about the portfolio itself
├── weekly_ideas/       # Ideas/blog section (appears inactive)
├── construction/       # Placeholder for under-construction pages
└── img/                # All images organized by feature
```

Each subdirectory typically contains:
- An HTML file
- A matching CSS file
- A matching JS file

## Key Architecture Patterns

### 1. Responsive Design
The site uses CSS media queries extensively with breakpoints at:
- 768px: Tablet/mobile navigation switch (hamburger menu appears)
- 600px: Mobile-specific layouts
- 500px: Small mobile adjustments

### 2. Navigation System
- **Desktop**: Horizontal nav bar with inline links (`nav .selection`)
- **Mobile**: Hamburger menu using CSS checkbox hack (`.dropdown .menu-btn:checked`)
- The mobile menu slides in from the right with transform animations

### 3. Scroll-Based Animations
The main page (`index.html`) uses ScrollMagic extensively:
- Fade-in effects for sections (e.g., `#sun-top-half.fade-in`)
- Sliding project cards triggered at scroll positions
- Animations defined in `my_app.js` with triggers at specific scroll hooks (0.2, 0.6, 0.9)

### 4. CSS Color Theming
CSS variables in `:root` define the color palette:
```css
--color-blue: #4f8a96
--color-dark-grey: #474747
--color-highlight: #d6b757
--color-soft-white: #eaeaea
```

### 5. Project Page Interaction Pattern
In `projects/projects.html`, projects are shown/hidden using:
- Each project button has a `data-target` attribute pointing to a "cloak" class
- Clicking a button removes `.hidden` from the target and adds it to others
- Different behavior on mobile (<1080px) vs desktop (menu slides away on mobile)

## Important Implementation Details

### LinkedIn Badge (Commented Out)
The LinkedIn profile badge is commented out in `index.html:42-45` because it breaks CSS. The async/defer loading was attempted but still caused issues.

### Carousel Feature (Inactive)
- `carousel.js` is linked in `index.html:50` but appears to be entirely commented out
- The "Idea of the Week" section (`#section5`) exists in CSS but is commented out of the HTML

### Cover Image Animation
On page load, `my_app.js` uses imagesloaded to detect when the cover image loads, then:
1. Animates the image size (80% width/height on desktop, 100% on mobile)
2. Slides in a gradient overlay (`#slider1`) after 1 second
3. Responsive behavior controlled by `window.matchMedia("(min-width: 700px)")`

### Work Experience Section
Work history is displayed as flex-wrapped cards (`.job-box`) in `#section4`. Each job has:
- Header image (`.job-header-img`) or standard header (`.job-header`)
- Date range (`.job-dates`)
- Description with inline company links (`.job-description a`)

## Common Development Tasks

### Testing Locally
Since there's no build process, simply open `index.html` in a browser. For proper testing:
```bash
# Use a simple HTTP server to avoid CORS issues
python3 -m http.server 8000
# Then open http://localhost:8000
```

### Adding a New Project
1. Add project HTML in relevant section of `index.html` (follow `.project` div structure)
2. Add corresponding button in `projects/projects.html` menu with unique `data-target`
3. Add project content section in `projects/projects.html` main with matching cloak class
4. Add images to appropriate `img/projects/` subdirectory
5. Update ScrollMagic scene in `my_app.js` if animation needed

### Modifying Colors
Update CSS variables in `style.css:1-6` to change the global color scheme. All color references use these variables.

### Working with Scroll Animations
ScrollMagic scenes in `my_app.js` follow this pattern:
```javascript
var scene = new ScrollMagic.Scene({
    triggerElement: '#element-id',
    triggerHook: 0.9  // 0=top, 0.5=center, 1=bottom of viewport
})
.setClassToggle('#target', 'css-class-name')
.addTo(controller);
```

## Git Workflow

Recent commits show active development on:
- Project text updates
- LinkedIn widget troubleshooting
- Carousel feature experimentation
- Experience and project content updates

The repository uses GitHub Pages for deployment, so commits to `master` branch will automatically deploy.

## Browser Compatibility Notes

The site uses several features requiring attention:
- ScrollMagic may have performance issues on older mobile browsers
- CSS `clip-path` (used in mobile About Me section) requires modern browser
- jQuery Transit uses CSS3 transitions - ensure fallbacks if needed
- The site includes iOS-specific CSS with `-webkit-touch-callout` detection for background-attachment
