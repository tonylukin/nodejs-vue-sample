const cityController = require('../controllers/cityController');

module.exports = [
    {
        method: 'get',
        path: '/:id',
        actions: [cityController.getById],
    },
    {
        method: 'get',
        path: '/',
        actions: [cityController.getList],
    },
    {
        method: 'post',
        path: '/',
        actions: [cityController.createCity],
    },
];
