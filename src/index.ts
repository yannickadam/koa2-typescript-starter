/**
 * Koa2 Starter pack with MongoDB and user authentication 
 *
 */
import * as Koa from 'koa';                 // Koa Framework
import * as Parser from 'koa-bodyparser';   
import * as mongoose from 'mongoose';       // Object Modeling for MongoDB 
import {config} from './utilities/configuration';
import {logger, koaLogger} from './utilities/logger';
import {koaRoutes} from './routes';

(async ()=> {

    try {
        // Connect to Database
        mongoose.PromiseProvider.set(global.Promise);  // Ensure Mongoose uses native promises - mongoose.Promise = global.Promise generates a TS error (ES6 module imports are constants)
        let dbUrl = config.get("database"); 
        logger.info(`Connecting to Database ${dbUrl}` );
        await mongoose.connect( dbUrl );
        logger.info(`Database connected.`);

        // Initialize Koa
        const app = new Koa();

        // First middleware to inject should be the logger
        app.use( koaLogger );

        // 
        app.use( Parser() );

        // Apply Routes
        app.use( koaRoutes );

        app.use( (ctx:Koa.Context)=>{
            ctx.body="Hello";
        })

        // Start listening
        logger.info(`Starting server on port ${config.get("port")}.`);
        await app.listen( config.get("port") );
        logger.info(`Server Started.`);

    } catch(err) {        
        logger.error(err);
    }
    
})();