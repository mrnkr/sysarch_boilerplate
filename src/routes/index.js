import express from 'express';
import createUser from './createUser';
import getCurrentUser from './getCurrentUser';
import changePassword from './changePassword';
import login from './login';

const router = express.Router();

getCurrentUser(router);
createUser(router);
changePassword(router);
login(router);

export default router;
