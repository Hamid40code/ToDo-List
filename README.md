# ToDo List

A React + Vite + TypeScript application styled with Tailwind CSS.

## Requirements

- Node.js 20.19+ or 22.12+ (required by Vite 8)
- npm

## Install and run

```bash
npm install
npm run dev
```

## Check and build

```bash
npm run typecheck
npm run build
npm run preview
```

## Project structure

```text
src/
├── assets/          # Existing task action icons
├── components/      # AddTask, ShowList, ThemeToggle
├── types/           # Shared TypeScript types
├── utils/           # Storage and ID helpers
├── App.tsx
├── index.css        # Tailwind import and global theme/animation tokens
└── main.tsx
```

## Preserved features

- Add draft tasks, remove them, and reorder them before submitting
- Submission confirmation animation
- Active and Done task views
- Complete, restore, and delete submitted tasks
- Persist draft tasks, submitted tasks, and theme in local storage
- Dark and light themes
- Responsive layout and reduced-motion support

The supplied ZIP contained the application's `src/` directory and image assets, but no `package.json`, HTML entry point, or build configuration. Those project files have been added as part of this migration. Existing local-storage keys (`tasks`, `submittedTasks`, and `theme`) are preserved, including support for the older saved task formats.
