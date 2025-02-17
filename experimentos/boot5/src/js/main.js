// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import { Popover } from 'bootstrap';

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })