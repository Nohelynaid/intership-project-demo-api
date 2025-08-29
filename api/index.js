const server = require('../dist/src/main').default;

module.exports = (req, res) => {
    return server(req, res);
};