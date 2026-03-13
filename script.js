const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const cartCountEl = document.getElementById('cart-count');
const addButtons = document.querySelectorAll('.add-btn');
const removeButtons = document.querySelectorAll('.remove-btn');
const moreBtn = document.getElementById('more-btn');
const suggestBtn = document.getElementById('suggest-btn');
const suggestText = document.getElementById('suggest-text');
const form = document.getElementById('lead-form');
const formResult = document.getElementById('form-result');

let cart = {};

function updateGlobalCount() {
  const total = Object.values(cart).reduce((s,n)=>s+n,0);
  cartCountEl.textContent = total;
}

function changeTheme() {
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');
  const isDark = body.classList.contains('dark-theme');
  themeBtn.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
  themeBtn.setAttribute('aria-pressed', String(isDark));
}

themeBtn.addEventListener('click', changeTheme);

addButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const id = card.dataset.id;
    if (!cart[id]) cart[id] = 0;
    cart[id] += 1;
    const countEl = card.querySelector('.item-count');
    countEl.textContent = cart[id];
    updateGlobalCount();
  });
});

removeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const id = card.dataset.id;
    if (!cart[id]) cart[id] = 0;
    if (cart[id] > 0) {
      cart[id] -= 1;
      const countEl = card.querySelector('.item-count');
      countEl.textContent = cart[id];
      updateGlobalCount();
    }
  });
});

moreBtn.addEventListener('click', () => {
  const shopSection = document.getElementById('shop');
  shopSection.scrollIntoView({ behavior: 'smooth' });
});

const suggestions = [
  'Если часто в дороге — обратите внимание на портативный аккумулятор Volt.',
  'Для уютных вечеров подойдёт умная лампа Lumo.',
  'Любите музыку — выбирайте беспроводные наушники Nova.',
  'Для работы и звонков удобен смарт-держатель для телефона.'
];

suggestBtn.addEventListener('click', () => {
  const index = Math.floor(Math.random() * suggestions.length);
  suggestText.textContent = suggestions[index];
});

const sliderContainer = document.getElementById('category-slider');
const slides = sliderContainer.querySelectorAll('.slide');
const dots = sliderContainer.querySelectorAll('.dot');
const prevBtn = sliderContainer.querySelector('.prev');
const nextBtn = sliderContainer.querySelector('.next');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

nextBtn.addEventListener('click', () => {
  let nextIndex = currentSlide + 1;
  if (nextIndex >= slides.length) nextIndex = 0;
  showSlide(nextIndex);
});

prevBtn.addEventListener('click', () => {
  let prevIndex = currentSlide - 1;
  if (prevIndex < 0) prevIndex = slides.length - 1;
  showSlide(prevIndex);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const values = {};
  for (const [k,v] of data.entries()) values[k]=v;
  if (!values.name || !values.email || !values.frequency || !values.pref) {
    formResult.textContent = 'Пожалуйста, заполните обязательные поля.';
    return;
  }
  formResult.textContent = 'Спасибо! Ваша заявка принята.';
  form.reset();
});
