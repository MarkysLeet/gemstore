# Engineering Guidelines

## Layout & Spacing Rules

### Standard Page Padding
All standard pages (Shop, Profile, About, etc.) must have sufficient top padding to clear the fixed Floating Header.
- **Rule:** Use `pt-32` (8rem / 128px) on the top-level container of any standard page.
- **Exception:** The Home Page uses a full-screen Hero section and handles its own layout, so it does not need this padding.
- **Reasoning:** The header is fixed and transparent/glassmorphic. Without this padding, page titles and content will be obscured.

### Color Palette
- **Light Theme:** Default text color is Dark Charcoal (`#1A1A1A` / `var(--foreground)`).
- **Dark Backgrounds:** Explicitly use `text-white` for content over dark backgrounds (like the Home Hero video).
- **Avoid:** Do not use `text-white` on the root `layout` or `body` if the background is light (`#FAF9F6`).

## Mobile Responsiveness
- **Hero Videos:** On mobile devices, background videos must be scaled (e.g., `w-[300%]`) or `object-cover` to ensure they fill the screen height without black bars.
