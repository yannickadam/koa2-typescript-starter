/**
 * Configuration Module
 * 
 * 
 */
import * as nconf from 'nconf';             // Configuration management

// Load configuration
const obj:any = {};
if( !obj.config ) {
    obj.config = nconf.argv().env().file({ file: "config.json" });
}

export var config = obj.config; 


