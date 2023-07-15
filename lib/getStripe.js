import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_51LZeT5GlfL9mY7eunBazHPTkOngTJB7kGmAK7RBCATbKOiWIeQ9wIp6MPvdWozU0zfSb0snclIcTKb31MuOisYEn00e9ZoV1BL');
    }

    return stripePromise;
}

export default getStripe;