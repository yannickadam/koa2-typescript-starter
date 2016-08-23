/**
 * Koa2 Starter pack with MongoDB and user authentication 
 *
 */
import * as Koa from 'koa';                 // Koa Framework
import * as mongoose from 'mongoose';       // Object Modeling for MongoDB 
import {config} from './utilities/configuration';
import {logger, koaLogger} from './utilities/logger';

(async ()=> {

    try {
        // Connect to Database
        mongoose.PromiseProvider.set(global.Promise);  // Ensure Mongoose uses native promises - mongoose.Promise = global.Promise generates a TS error (ES6 module imports are constants)
        logger.info(`Connecting to Database ${config.get("database")}` );
        await mongoose.connect( config.get("database") );
        logger.info(`Database connected.`);

        // Initialize Koa
        const app = new Koa();

        // First middleware to inject should be the logger
        app.use( koaLogger );

        // !!! For demonstration purposes only !!!
        app.use( async (ctx:Koa.Context, next:any) => {
            ctx.body = "<html><body><h1>Koa2 TypeScript starter pack</h1></body></html>";
        });        

        // Start listening
        logger.info(`Starting server on port ${config.get("port")}.`);
        await app.listen( config.get("port") );
        logger.info(`Server Started.`);

    } catch(err) {        
        logger.error(err);
    }
    
})();