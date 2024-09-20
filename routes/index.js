const cityRoutes = require('./city');
const weatherRoutes = require('./weather');

module.exports = {
    setup: function (app) {
        const routes = [
            ...cityRoutes,
            ...weatherRoutes,
        ];

        for (const route of routes) {
            app[route.method].apply(app, [route.path, ...route.actions]);
        }
    }
}