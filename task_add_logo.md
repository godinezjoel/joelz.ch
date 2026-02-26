# Task: Add SVG Logo

I have created a custom SVG logo and added it to the site header and favicon.

## Changes
1.  **Created `public/logo.svg`**:
    - Designed a vector logo matching the description (White 'J' with sparkles on a black background).
    - The SVG is scalable and responsive.
2.  **Updated `index.html`**:
    - Changed the favicon link to point to `/logo.svg`.
3.  **Updated `src/components/Navbar.jsx`**:
    - Replaced the generic `Terminal` icon with the new custom logo image.
    - Added styling to ensure it fits the navbar (32x32px with rounded corners).

## Verification
- The logo should appear in the browser tab (favicon).
- The logo should appear in the top navigation bar next to "Joelz Portfolio".
