const router = require('express').Router();

router.all('/*', (req, res, next) => {
      next();
  })


module.exports = router