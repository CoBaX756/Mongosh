const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
    res.send('El servidor está en funcionamiento');
});

module.exports = router;
