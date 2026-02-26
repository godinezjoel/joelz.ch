# Task: Pixelated Heart in Footer

I have replaced the standard heart icon in the footer with a custom pixelated "Minecraft-style" heart.

## Changes
1.  **Created `public/pixel-heart.svg`**:
    - Designed a 9x9 pixel art heart with a black border, red fill, and a small white highlight.
    - Used `shape-rendering="crispEdges"` to ensure the pixels stay sharp.
2.  **Updated `src/components/Footer.jsx`**:
    - Removed the `Heart` icon from `lucide-react`.
    - Removed the unused `heart` style object.
    - Added an `<img>` tag pointing to `/pixel-heart.svg` with a size of 16x16px (scalable).

## Verification
- Scroll to the footer.
- Verify the "Made with [Heart] by Joel Godinez" line now shows a pixelated heart.
