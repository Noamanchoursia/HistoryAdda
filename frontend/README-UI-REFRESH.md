# History Adda frontend refresh

## What changed

- Refreshed the visual system with a warm heritage palette, clearer typography, more whitespace, rounded surfaces and responsive layouts.
- Rebuilt the header and footer for desktop and mobile, including active navigation states and an accessible mobile-menu toggle.
- Redesigned the homepage hero, walk cards, walks listing, gallery and booking page.
- Implemented working walk category filters.
- Added lazy-loaded route components and a 404 page.
- Fixed the booking schema initialization order, future-date validation, Indian mobile-number validation, empty group-type handling and booking error messaging.
- Normalized walk API responses and added local walk data as a graceful fallback when the API is unavailable or empty.
- Added local gallery fallback data, fixed gallery image extensions and rebuilt the lightbox with Escape/arrow-key support and proper click layering.
- Replaced 1x1 image placeholders with visible branded placeholders so missing photos no longer render as blank pixels.
- Added WebP versions of key photos and updated the frontend to use them, reducing the largest walk-cover image substantially.
- Split the language context and hook into separate modules and made localStorage access defensive.

## Run locally

Use Node.js 18 or newer:

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

Set the backend URL in `.env` if your API is not served from the same origin:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## Photo assets still requiring owner-supplied images

The following files are visible placeholders, not authentic photography:

- `public/images/founder/portrait.webp`
- `public/images/founder/group.webp`
- `public/images/walk-03/cover.webp`

Replace these with approved photographs while keeping the same filenames, or update the corresponding image paths in the components/data.

## Validation performed

- ESLint: passed with no code errors or warnings (the React plugin prints a general notice that the React version is not explicitly configured).
- JavaScript/JSX syntax parse: all source files parsed successfully.
- Vite production build: could not be executed in this Linux review environment because the uploaded `node_modules` came from Windows and lacks the Linux Rollup optional binary. The ZIP intentionally excludes `node_modules`; install dependencies on your own machine with `npm install` before building.

## Historyaddaa content update (November 2026)

The local frontend data now contains the four supplied Echoes of Jabalpur walks:
- The Old City Trail (`old-city-trail`)
- Temple Architecture & Stories (`temple-architecture-stories`)
- Gonds & Jabalpur (`gonds-and-jabalpur`)
- The Colonial Trail (`colonial-trail`)

Walk routes, duration, distance, meeting/ending points, public group size, ticket price, languages, schedule and participant instructions are in `src/data/walks.js`. The founder section uses `public/images/founder/portrait.webp` for the founder portrait and `public/images/founder/guide-in-the-field.webp` for the field/guide photograph. English and Hindi locale files contain the updated founder copy and UI labels.

Booking policy content reflects the supplied business document: advance payment is required; payment instructions are currently shared manually through WhatsApp; booking requests close 8 hours before the walk subject to availability; advance payments are non-refundable but can be adjusted to the next scheduled walk if the participant cancels; public walks require 3–15 participants. Private walk pricing is quoted separately.

Before public launch, review the legal wording of the Privacy Policy and Terms and Conditions, confirm photo publication permissions and final Hindi translations, and connect the booking form to the deployed backend. The frontend package was not built in this environment because npm dependencies were not available in the local cache; run `npm ci`, `npm run lint`, and `npm run build` on a machine with registry access before deployment.
