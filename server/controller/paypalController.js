const axios = require('axios');

const getAccessToken = async () => {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const apiUrl = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';
    
    if (!clientId || !clientSecret) {
        throw new Error('PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET is missing in .env');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await axios({
        url: `${apiUrl}/v1/oauth2/token`,
        method: 'post',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=client_credentials'
    });

    return response.data.access_token;
};

const createOrder = async (req, res) => {
    try {
        const { amount } = req.query;
        const apiUrl = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';
        const accessToken = await getAccessToken();

        const response = await axios({
            url: `${apiUrl}/v2/checkout/orders`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: amount
                    }
                }]
            }
        });

        // Trả về ID của order theo yêu cầu của Client
        res.json(response.data.id);
    } catch (error) {
        console.error('Error creating PayPal order:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to create PayPal order' });
    }
};

const captureOrder = async (req, res) => {
    try {
        const orderId = req.query.orderId || req.body.orderId;
        const apiUrl = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';
        const accessToken = await getAccessToken();

        const response = await axios({
            url: `${apiUrl}/v2/checkout/orders/${orderId}/capture`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error capturing PayPal order:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to capture PayPal order' });
    }
};

module.exports = { createOrder, captureOrder };
