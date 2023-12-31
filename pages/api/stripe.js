import Stripe from 'stripe';

const stripe = Stripe('sk_test_51LZeT5GlfL9mY7eufAgCDrcPpXQsVwjE4BlrjdbFq7B6eejUrcuYMVcR6JZ8UJjlrXjSxqQ2BtgymxVjfxa23kOe00yYk4I0vd');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1LZec5GlfL9mY7euHAZGkYon' },
                    { shipping_rate: 'shr_1LZedAGlfL9mY7eubFo8OHk8' },
                ],
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace('image-', 'http://cdn.sanity.io/images/ehb0hrvp/production/').replace('-jpg', '.jpg');
                    return {
                        price_data: {
                            currency: 'cad',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity,
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,

            }
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}