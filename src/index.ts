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
import {corsHandler} from './utilities/corshandler';

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

        // Logger needs to be injected first
        app.use( koaLogger );

        // Handle CORS requests
        app.use( corsHandler );

        // Parses body params
        app.use( Parser() );

        // Apply Routes
        app.use( koaRoutes );

        // Generic reply - Needs to return 404
        app.use( (ctx:Koa.Context)=>{
            // TODO: 404
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