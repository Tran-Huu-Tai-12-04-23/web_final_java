import axios from 'axios';

class APIService {
    constructor() {
        this.client = axios.create({
            baseURL: process.env.BASE_URL_API || 'http://localhost:8099/api/v1/', // Thay thế bằng URL của API của bạn
        });

        this.client.interceptors.response.use(this.handleSuccess, this.handleError);
    }

    handleSuccess(response) {
        return response.data;
    }

    handleError(error) {
        return null;
    }
    get(subURL) {
        return this.client.get(subURL);
    }

    post(subURL, data) {
        return this.client.post(subURL, data);
    }
    delete(subURL) {
        return this.client.delete(subURL);
    }
    put(subURL, data) {
        return this.client.put(subURL, data);
    }
}

export default new APIService();
