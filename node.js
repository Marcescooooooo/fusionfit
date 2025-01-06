const express = require('express');
const stripe = require('stripe')('tu-clave-secreta'); // Sustituye 'tu-clave-secreta' con tu clave secreta
const app = express();

app.use(express.json());

app.post('/crear-sesion', async (req, res) => {
  const items = req.body.items || [];

  const lineItems = items.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // Convertir euros a céntimos
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html',
      cancel_url: 'http://localhost:3000/cancel.html',
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));
