import {Server} from "http";
import mongoose from "mongoose";
import app from "./app";
// import config from "./app/modules/config";
// import config from "./app/modules/config";

let server: Server;

const startServer = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://SKJ_69:Oi27ydF8DHFPXQJ3@cluster0.baizo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      );

      console.log("✅ Database Connected Successfully!");

      server = app.listen(5000, () => {
        console.log(`✅ Server is running on port: 5000`);
      });
    } catch (error) {
      console.log(error);
    }
}

startServer();