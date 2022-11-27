# Project Setup

Project created using vite

```bash
yarn create vite
```

## Installing Tailwind

Reference: https://tailwindcss.com/docs/guides/vite

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```


```js
// tailwind.config.cjs

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

## Notes

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

https://www.geeksforgeeks.org/how-to-control-fps-with-requestanimationframe/