const orderItemsContainer = document.getElementById('order-items');
const totalPriceEl = document.getElementById('total-price');

const orderItems = JSON.parse(localStorage.getItem('cart')) || [];

function renderOrderItems() {
  orderItemsContainer.innerHTML = '';

  if (orderItems.length === 0) {
    orderItemsContainer.innerHTML = '<p>В вашем заказе нет товаров.</p>';
    totalPriceEl.textContent = '';
    return;
  }

  let total = 0;

  orderItems.forEach(item => {
    total += item.price * item.quantity;

    const itemEl = document.createElement('div');
    itemEl.className = 'order-item';

    itemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}" width="120" height="80" />
      <div class="order-item-info">
        <h3>${item.name}</h3>
        <p>Цена: ${item.price.toLocaleString()} ₽</p>
        <p>Количество: ${item.quantity}</p>
        <p>Сумма: ${(item.price * item.quantity).toLocaleString()} ₽</p>
      </div>
    `;

    orderItemsContainer.appendChild(itemEl);
  });

  totalPriceEl.textContent = `Общая сумма: ${total.toLocaleString()} ₽`;
}

renderOrderItems();
document.addEventListener('DOMContentLoaded', () => {
  const orderForm = document.getElementById('order-form');

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!fullname || !phone) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    localStorage.removeItem('cart');
    alert('Заказ оформлен! Спасибо за покупку.');

    window.location.href = 'index.html';
  });
});
