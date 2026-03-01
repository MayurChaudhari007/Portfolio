import mongoose from "mongoose";

// mongoose.connect("mongodb+srv://portfolioAdmin:RWLEjsXCMaLWJWCy@portfolio-cluster.o1r2n0n.mongodb.net/?appName=portfolio-cluster")
// const uri = "mongodb://portfolioAdmin:RWLEjsXCMaLWJWCy@portfolio-cluster-shard-00-00.o1r2n0n.mongodb.net:27017,portfolio-cluster-shard-00-01.o1r2n0n.mongodb.net:27017,portfolio-cluster-shard-00-02.o1r2n0n.mongodb.net:27017/?ssl=true&replicaSet=atlas-m0rm6x-shard-0&authSource=admin&retryWrites=true&w=majority";
const uri="mongodb+srv://user1:yG9VNz7i203WHc4V@portfolio-cluster.o1r2n0n.mongodb.net/?appName=portfolio-cluster"
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    process.exit();
  })
  .catch(err => {
    console.error(err);
  });