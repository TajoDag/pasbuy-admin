import axios from 'axios';

export const getAccessToken = async () => {
    const clientId = "84194906249363c476db90dcc4d014c8";
    const clientSecret = "8101f65f7e2f852d00bc0a8013031313c382b6c9";

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
        const response = await axios.post(
            'https://accounts.livechatinc.com/token',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        // console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch access token');
    }
};
