import '@/app.css'
import App from '@/App.svelte'

const app = new App({
  target: document.getElementById('app') as HTMLElement,
  intro: true
})

export default app
