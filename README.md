# FlyFilm Productions

A blazing-fast, interactive single-page website for a film production company — built with pure HTML, CSS, and vanilla JavaScript. Zero dependencies, instant load.

## Features

- **Cinematic hero** with Ken Burns parallax background
- **Fluid scroll animations** via Intersection Observer (no library overhead)
- **Animated stat counters** with eased counting on scroll
- **Responsive grid portfolio** showcasing selected work
- **Full-service section** with hover-animated cards
- **Testimonials section** with client reviews
- **Smart contact form** with inline validation and submit feedback
- **Mobile-first navigation** with animated hamburger + fullscreen menu
- **Ambient cursor glow** that follows the pointer on desktop
- **Loading preloader** with staggered letter animation
- **Active nav tracking** highlights current section while scrolling
- **Smooth scrolling** for all anchor links
- **Fluid typography** using `clamp()` for every heading
- **Gold + dark cinematic palette** with Playfair Display + Inter fonts

## Tech

| Layer | Choice |
|-------|--------|
| Markup | Semantic HTML5 |
| Styling | Embedded CSS (custom properties, Grid, Flexbox, `clamp()`) |
| Interaction | Vanilla JS (IntersectionObserver, requestAnimationFrame) |
| Fonts | Google Fonts (Inter, Playfair Display) |
| Images | Unsplash (lazy-loaded) |

## Quick Start

Open `index.html` in any browser — no build step, no server required.

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## Performance

- Zero JavaScript frameworks — raw DOM APIs only
- Lazy-loaded images with `loading="lazy"`
- CSS animations use `will-change` and GPU-composited transforms
- Passive scroll listeners
- Preconnect hints for Google Fonts
