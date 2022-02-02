const { Router } = require('express');
const {
  loginUSerHandler,
  recoverPassHandler,
  resetPassHandler,
  updatePassHandler,
} = require('./local.controller');
//rutas
// /auth/local/login

//login
//forgot password
//reset password
//validate email
const router = Router();
router.post('/login', loginUSerHandler);
router.post('/forgot-password', recoverPassHandler);
router.post('/reset-password', resetPassHandler);
router.post('/update-password', updatePassHandler);
/*router.post('validate-email', (req, res) => {});
 */
module.exports = router;
