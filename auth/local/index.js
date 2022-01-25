const { Router } = require('express');
const { loginUSerHandler } = require('./local.controller');
//rutas
// /auth/local/login

//login
//forgot password
//reset password
//validate email
const router = Router();
router.post('/login', loginUSerHandler);
/* router.post('/forgot-password', (req, res) => {});
router.post('reset-password', (req, res) => {});
router.post('validate-email', (req, res) => {});
 */
module.exports = router;
