import mongoose from "mongoose";

const connectDb = async ()=>{
 try {
   const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_NAME}`)
   console.log(`Mongo DB connected : Db host ${connectionInstance.Connection.host}`);
 } catch (error) {
    console.log("Mongo DB connection failed !!" , error);
    process.exit(1)
 }
}

export { connectDb }