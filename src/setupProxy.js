const proxy = require("http-proxy-middleware");
const port = process.env.PORT || 5000;

module.exports = function(app) {
  app.use(proxy("/login", { target: `http://localhost:${port}` }));
  app.use(proxy("/register", { target: `http://localhost:${port}` }));
  app.use(proxy("/ordercreate", { target: `http://localhost:${port}` }));
  app.use(proxy("/getorder", { target: `http://localhost:${port}` }));
};
