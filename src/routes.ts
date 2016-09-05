/**
 * Routes configuration
 * 
 * Declare all routes here
 *
 */
import * as Koa from 'koa';                 // Required for definitions
import * as Router from 'koa-router';

// Import modules here
import {Users} from './modules/users';

// Initialize router
const router = new Router();

// Declare routes below
router.post('/users', Users.create);
router.post('/users/login', Users.login);

// 
export var koaRoutes = router.routes();