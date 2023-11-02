const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
    // Gọi dotenv để lấy các biến môi trường từ tệp .env
    const env = dotenv.config().parsed;

    // Chuyển đổi các biến môi trường thành một đối tượng chứa các biến
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        plugins: [new webpack.DefinePlugin(envKeys)],
    };
};
