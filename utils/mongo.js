import mongodb from "mongodb";

let database;

export const initializeMongoConnection = async()=>{
    try {
        const url = "mongodb://localhost:27017/";
        const client = new mongodb.MongoClient(url,{useUnifiedTopology:true});
        const dbName = "shortenerSystem";
        await client.connect();
        console.log('DB: connected.');
        database = client.db(dbName);
    } catch (error) {
        console.log('Mongo connection fail');
    }
    return database;
}

export const getMongoDbInstance = async()=>{
    if(database){
        return database;
    }
    return await initializeMongoConnection();
}