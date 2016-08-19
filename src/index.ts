/**
 * 
 */
import * as Koa from 'koa';
import * as mongoose from 'mongoose';

const app = new Koa();

(async ()=> {

    try {
        // Connect to Database
        mongoose.Promise = global.Promise;  // Ensure Mongoose uses native promises
        await mongoose.connect("mongodb://localhost/project");

        // !!! For demonstration purposes only !!!
        app.use( (ctx:Koa.Context, next:any) => {
            ctx.body = "Welcome to Koa!";
        });

        await app.listen(3125);
        console.log("Server started on port 3125.");

    } catch(err) {
        console.log(err);
    }
    
})();