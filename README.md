# Charts App

A modern and responsive dashboard application for visualizing data using interactive charts.

![Dashboard Dark Mode](screenshots/darkMode.png)

## Features

- 📊 Interactive charts and data visualizations
- ⚡ Built with **Vite** for fast development
- 🎨 Styled using **Tailwind CSS**
- 💻 Written in **React + TypeScript**
- ✅ Code linting with **ESLint** and formatting with **Prettier**

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/rimarayya/charts-app.git
    ```

2. **Move to the project file** :

    ```bash
    cd charts_app
    ```

3. **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

4. **Start the development server**:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. **Open your browser and navigate to**:
    ```
    http://localhost:5173
    ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The production-ready files will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
charts_app/
├── index.html           # Entry HTML file
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Dashboard pages
│   └── assets/          # Static assets
└── public/              # Public files
```

## Screenshots

Add screenshots of your dashboard here:

![Dashboard Light Mode](screenshots/lightMode.png)
