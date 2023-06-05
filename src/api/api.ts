import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

abstract class API {

    static wooApi = new WooCommerceRestApi({
        url: "https://decalproject.com",
        consumerKey: process.env.REACT_APP_WOO_API_KEY || '',
        consumerSecret: process.env.REACT_APP_WOO_SECRET_API_KEY || '',
        version: "wc/v3",
        queryStringAuth: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'),
        // axiosConfig: {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // }
    });

    static get<T>(endpoint: string, params: any): Promise<T> {
        return this.wooApi.get(endpoint, params);
    }

    static post<T>(endpoint: string, data: any, params?: any): Promise<T> {
        return this.wooApi.post(endpoint, data, params);
    }



}

export default API;