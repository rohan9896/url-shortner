import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connect.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
