const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:5000', //자기가 설정한서버 index.js에서 확인후 포트번호 입력
			changeOrigin: true,
		})
	);
};