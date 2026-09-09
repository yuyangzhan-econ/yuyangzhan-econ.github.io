# Academic homepage redesign — preview v1

## Branches and release status

Baseline: `5646779874ceb7a3da6fac70dc4d48aeb11bc21f`.
The original site is preserved on `backup/pre-redesign-2026-09-08`.
Work branch: `redesign/academic-homepage-v1`. Do not merge until visual review and the asset checks below pass.

The downloadable preview/update bundle contains both the uploaded CV and the new portrait.
The text-only GitHub draft initially needs these two binary files added; do not merge an asset-incomplete version.

## Asset checks

- `CV/Yuyang-Zhan-2026.pdf` — exact, unedited bytes of the supplied CV. SHA-256: `e5f575bcb5f0f50d93fb037db4033748da58edc6332c8b018bbf069b2e9f3022`.
- `images/yuyang-zhan.jpg` — resized, EXIF-orientation-corrected copy of the supplied portrait; square cropping is CSS-only. SHA-256: `9b95cb3b70310863f72ffeff7ea8a4abaac023c4e2cc3db7ad1660bd02a2683b`.

The PDF intentionally retains its existing internal email and paper title; the website uses the user-specified Berkeley email and the newly supplied September 2026 paper title/abstract. No full paper PDF was supplied, so there is no fabricated paper download link.

## Editing map

- `_config.yml`: name, identity, email, affiliations, CV path, site metadata.
- `_data/navigation.yml`: navigation links.
- `_includes/academic/home.html`: bio, research, teaching, education and honors.
- `_pages/personal.html`: Personal copy.
- `_includes/academic/profile.html`: non-sticky sidebar and square photo.
- `assets/css/academic.css`: all styles for the new layout; sizes/colors live in one place.
- `assets/js/academic.js`: once-per-refresh section reveals, abstract expansion and theme bars.
- `_layouts/academic.html`: self-contained layout; deliberately does not import legacy scripts/styles.

Only Research and Teaching are reveal targets. Each whole section fades from 0.35 to 1 the first time it intersects the reading region, then is unobserved. Seen sections survive navigation to Personal and back within the same tab. Reload clears the seen state. Reduced-motion and JavaScript-off users get visible content and a native expandable abstract.

The legacy `/Research/` and `/Teaching/` paths redirect to their homepage anchors; old `/about/` links still reach the homepage. The original CV URL is not deleted.

## Validation scope

JavaScript syntax, local Chromium DOM/layout checks at 1440, 390 and 320 px, native details fallback, rapid abstract toggles, reduced motion, theme bars, and the section state machine were checked. PDF bytes match the upload.

The isolated runner cannot navigate to HTTP/file URLs, so browser tests used inline local resources and simulated storage/navigation for the state machine. A full Jekyll build, actual cross-page network navigation, GitHub Pages deployment, Safari and Firefox have not been tested.

Body font: Source Sans Pro from Google Fonts, falling back to Helvetica Neue/Arial. Exact reference-site CSS font identification was unavailable; this choice is provisional for visual review. Local screenshots use the declared fallback because external font loading is unavailable in the runner. Section headings retain Georgia (or its platform serif fallback).

## Before merging

1. Add both binary assets from the update bundle and verify the SHA-256 values above.
2. Run `bundle exec jekyll build` and inspect the generated home, Personal and redirect pages.
3. Review desktop/mobile sizes, the crop, and the real web font; confirm the design before merging into master.
