const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');

router.get('/protected-route', authorize('view_accounts'), (req, res) => {
    res.send('Bạn có quyền truy cập vào route này');
});

module.exports = router;
