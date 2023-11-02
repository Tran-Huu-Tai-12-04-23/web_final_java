import axios from 'axios';

class APIService {
    constructor() {
        this.client = axios.create({
            baseURL: process.env.BASE_URL_API, // Thay thế bằng URL của API của bạn
        });

        this.client.interceptors.response.use(this.handleSuccess, this.handleError);
    }

    handleSuccess(response) {
        return response.data;
    }

    handleError(error) {
        if (error.response) {
            // Xử lý lỗi từ phản hồi HTTP (HTTP error)
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // Xử lý lỗi liên quan đến việc gửi yêu cầu (request error)
            return Promise.reject('Network error. Please try again later.');
        } else {
            // Xử lý lỗi khác
            return Promise.reject('An error occurred. Please try again later.');
        }
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
