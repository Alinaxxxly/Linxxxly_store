document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.add-to-cart');
  const notification = document.createElement('div');
  Object.assign(notification.style, {
    position: 'fixed',
    top: '80px',
    right: '20px',
    background: '#ff4d91',
    color: '#fff',
    padding: '15px 25px',
    borderRadius: '30px',
    fontWeight: '700',
    fontSize: '16px',
    zIndex: '10000',
    opacity: '0',
    transition: 'opacity 0.5s ease',
    pointerEvents: 'none',
  });
  document.body.appendChild(notification);

  let notificationTimeout;

  function showNotification(message) {
    clearTimeout(notificationTimeout);
    notification.textContent = message;
    notification.style.pointerEvents = 'auto';
    notification.style.opacity = '1';

    notificationTimeout = setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.pointerEvents = 'none';
    }, 2500);
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      if (!productCard) return;

      const { id, name, price, img } = productCard.dataset;
      if (!id || !name || !price || !img) return;

      const product = {
        id,
        name,
        price: parseFloat(price),
        img,
        quantity: 1
      };

      let cart = [];
      try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
      } catch {
        cart = [];
      }

      const existingIndex = cart.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Корзина:', cart);
      showNotification(`Товар ${product.name} добавлен в корзину!`);
    });
  });
});
