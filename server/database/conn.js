import mongoose, { mongo } from 'mongoose';

import {MongoMemoryServer} from 'mongodb-memory-server';
//require('dotenv').config();

async function connect(){
    const mongodb= await MongoMemoryServer.create();
    const getUri= mongodb.getUri();

    mongoose.set('strictQuery',true);

    const db = mongoose.connect(getUri);

    return db;
}

export default connect;