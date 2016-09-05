/**
 * 
 * 
 */
import * as Koa from 'koa';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';

import {logger} from '../utilities/logger';
import {config} from '../utilities/configuration';

import {User} from '../models/user';

/**
 * Creates a new user in Database
 */
export async function Create (ctx:Koa.Context, next:any) {
    const request:any = ctx.request;
    const data:any = request.body;
    logger.info("Received:", data);

    var hash = bcrypt.hashSync(data.password);
 
    var user = new User({ name: data.name, password: hash });
    
    var test = await user.save();
    logger.info("Created:", test);

    ctx.body = "Created";
}
 
/**
 * Authenticates a user and returns a JSON Web Token (JWT)
 * 
 */
export async function Login(ctx:Koa.Context, next:any) {
   
    // Extract & log request data
    const request:any = ctx.request;
    const data:any = request.body;
    logger.info("Received:", data);

    // Prepare response
    let response:any = {};

    // Find user in Database
    let user:any = await User.findOne({name: data.name});

    // Check password match
    if( user && bcrypt.compareSync( data.password, user.password ) ) {
        // Create Token
        const token = jwt.sign({user:data.name}, config.get("secret") );
        response.token = token;
    } else {
        response.error = "Unable to authenticate user.";
        ctx.response.status = 401;
    }    

    ctx.body = response; 
}

export var Users = { login: Login, create: Create };