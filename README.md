# React To-Do List App

A simple, modern, and responsive To-Do List application built with **React** and **CSS**. It allows users to manage their daily tasks through a clean interface, with support for adding, deleting, and rearranging tasks.

## Features

- **Add Tasks:** Add new tasks using the input field.
- **Delete Tasks:** Remove tasks you no longer need.
- **Move Tasks Up and Down:** Change the order of tasks using movement buttons.
- **Persistent Storage:** Keep tasks saved after refreshing the page using browser storage.
- **Dark Theme:** A dark interface with CSS variables for consistent colors.
- **Custom Scrollbar:** Display the scrollbar only when the task list overflows its available space.
- **Responsive Layout:** Centered application layout that adapts to different screen sizes.
- **Animations:** Smooth transitions and animations for a better user experience.
- **Input Validation:** Prevent empty or whitespace-only tasks from being added.

## Technologies Used

- **React** — Builds the user interface and manages application state.
- **JavaScript (ES6+)** — Handles task operations and application logic.
- **CSS3** — Styles the interface, animations, layout, and scrollbar.
- **Browser Storage** — Stores tasks locally so they can persist across page refreshes.

## Project Structure

```text
project/
├── public/
├── src/
│   ├── assets/
│   │   ├── arrow-big-down-dash.png
│   │   ├── arrow-big-up-dash.png
│   │   └── circle-x.png
│   ├── components/
│   │   ├── AddTask.jsx
│   │   └── AddTask.css
│   ├── App.jsx
│   ├── style.css
│   └── main.jsx
├── package.json
└── README.md
```

*Note: Adjust the folder structure above to match your actual project.*

## Getting Started

### 1. Install Node.js

Install [Node.js](https://nodejs.org/) if it is not already installed.

### 2. Clone or Download the Project

Download the project files to your computer, or clone the repository if it is hosted on GitHub.

### 3. Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### 4. Start the Development Server

Run:

```bash
npm run dev
```

Open the local URL shown in your terminal to view the application in your browser.

*These commands assume your project uses Vite. Other React setups may use different commands.*

## How to Use

1. Type a task into the input field.
2. Click **Add** to add it to your list.
3. Use the **up arrow** to move a task higher in the list.
4. Use the **down arrow** to move a task lower in the list.
5. Click the **delete button** to remove a task.
6. Refresh the page to check whether your tasks remain saved.

## Styling and Theme

The application uses CSS custom properties to manage colors consistently across components.

Example:

```css
:root,
.dark-root {
    color-scheme: dark;

    --bg-dark: #0b1120;
    --bg: #151f32;
    --bg-light: #1e293b;

    --text: #e2e8f0;
    --text-muted: #94a3b8;
    --border: #334155;

    --accent: #818cf8;
}
```

These variables make it easier to customize the application's background, text, borders, and accent colors.

## Future Improvements

- Mark tasks as completed.
- Add task editing functionality.
- Add task categories and priorities.
- Add due dates and reminders.
- Implement light and dark theme switching.
- Improve accessibility and keyboard navigation.

## Learning Goals

This project provides practice with:

- React functional components and hooks.
- Managing state with `useState`.
- Handling user input and events.
- Rendering lists with `.map()`.
- Updating and filtering arrays without directly mutating state.
- Styling components with CSS Flexbox.
- Creating responsive layouts and CSS animations.
- Saving data in browser storage.

## License

This project is intended for learning and personal use. Add a license if you plan to distribute or publish it publicly.

---

**Built with React, JavaScript, and CSS.**