# Timothy Portfolio Design System

## Intent

A sharp operator workspace inspired by Linux TUIs, printed system manuals, and Gruvbox—not a simulated shell. The interface combines a file tree, readable document pane, project inspector, and optional command line.

## Color

Use a dark Gruvbox-derived palette in OKLCH. `--bg` and `--panel` create depth without gradients. Warm foreground carries long-form text; yellow marks active navigation, aqua marks paths, green marks healthy state, orange marks calls to action, and red is reserved for warnings. Borders are always visible.

## Typography

One deliberate terminal family stack: Berkeley Mono, Cascadia Code, JetBrains Mono, then system monospace. Hierarchy comes from scale, weight, rules, and color—not a decorative display face. Body copy stays below 72ch.

## Shape

Square corners throughout. One-pixel rules, inset highlights, and offset shadows create physical depth. No glass, pills, soft cards, or ornamental glow.

## Layout

Desktop uses a three-pane shell: file tree, document viewport, contextual inspector. Tablet collapses the inspector below the document. Mobile keeps a compact tab rail and command prompt with no horizontal overflow.

## Motion

A short boot sequence and restrained selection transitions. No continuous background animation. `prefers-reduced-motion` disables reveals and cursor blinking.

## Interaction

Every terminal command is mirrored by a visible button. Sections support `G` keyboard shortcuts, the command prompt supports history, and project rows expose selection state with text and shape as well as color.
