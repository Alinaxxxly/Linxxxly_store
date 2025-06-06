const cartItemsContainer = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const clearCartBtn = document.getElementById('clear-cart-btn');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    totalPriceEl.textContent = '';
    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Корзина пуста</p>';
    clearCartBtn.style.display = 'none';
    checkoutBtn.style.display = 'none';
    return;
  }

  clearCartBtn.style.display = 'inline-block';
  checkoutBtn.style.display = 'inline-block';

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';

    itemEl.innerHTML = `
    <img src="${item.img}" alt="${item.name}" />
    <div class="cart-item-info">
      <strong>${item.name}</strong><br />
      <!-- Убрали строку с белой ценой -->
      <div class="cart-item-controls">
        <button class="decrease-btn" data-index="${index}" aria-label="Уменьшить количество">−</button>
        <span>${item.quantity}</span>
        <button class="increase-btn" data-index="${index}" aria-label="Увеличить количество">+</button>
      </div>
    </div>
    <div class="price-remove-container">
      <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()} ₽</div>
      <button class="remove-btn" data-index="${index}" aria-label="Удалить товар">×</button>
    </div>
  `;
  
    cartItemsContainer.appendChild(itemEl);
  });

  totalPriceEl.textContent = `Итого: ${total.toLocaleString()} ₽`;
}

cartItemsContainer.addEventListener('click', (event) => {
  const btn = event.target;
  if (!btn.dataset.index) return;

  const i = Number(btn.dataset.index);

  if (btn.classList.contains('increase-btn')) {
    cart[i].quantity++;
  } else if (btn.classList.contains('decrease-btn')) {
    if (cart[i].quantity > 1) {
      cart[i].quantity--;
    } else {
      cart.splice(i, 1);
    }
  } else if (btn.classList.contains('remove-btn')) {
    cart.splice(i, 1);
  } else {
    return;
  }

  saveCart();
  renderCart();
});

clearCartBtn.addEventListener('click', () => {
  if (confirm('Вы уверены, что хотите очистить корзину?')) {
    cart = [];
    saveCart();
    renderCart();
  }
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Корзина пуста');
    return;
  }
  window.location.href = 'order.html';
});

renderCart();
