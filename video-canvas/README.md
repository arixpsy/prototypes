# Project Setup

```bash
yarn create vite
```

# Installing Tailwind

https://tailwindcss.com/docs/guides/vite

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
updating tailwind.config

```js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```