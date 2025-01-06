// Lógica del carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(planName, price) {
  cart.push({ name: planName, price: price });
  localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
  alert(`${planName} añadido al carrito.`);
}

function updateCartLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

document.addEventListener('DOMContentLoaded', () => {
  cart = loadCart();
  renderCart();
});

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<tr><td colspan="3">Tu carrito está vacío.</td></tr>';
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      cartItemsContainer.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.price}€</td>
          <td><button class="btn-delete" onclick="removeFromCart(${index})">Eliminar</button></td>
        </tr>`;
    });
  }

  cartTotalContainer.textContent = `${total}€`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartLocalStorage();
  renderCart();
}
