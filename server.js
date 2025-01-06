const express = require('express');
const stripe = require('stripe')('sk_test_tuClaveSecretaAqui'); // Reemplaza con tu clave secreta de Stripe
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
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://fusionfit.netlify.app/success.html',
      cancel_url: 'https://fusionfit.netlify.app/cancel.html',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error al crear la sesión de Stripe:', error);
    res.status(500).send('Error al crear la sesión de pago');
  }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
