/**
 * 这里实现自定义接口代理
 */
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy('/api', {
            target: 'http://127.0.0.1:7001',
            pathRewrite: {
                '^/api': ''
            }
        })
    );
};
