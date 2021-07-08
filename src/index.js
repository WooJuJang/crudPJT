import { ApolloServer } from 'apollo-server';
import resolvers from './graphql/resolvers.js';
import typeDefs from './graphql/typeDefs.js';
import mongoose from 'mongoose';

// ApolloServer는 스키마와 리졸버가 반드시 필요함
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// listen 함수로 웹 서버 실행
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/MovieDB", {
    useUnifiedTopology:true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
  })
  .then(() => {
    console.log("Connected to MongoDB");

  })
  .catch((err) => {
    console.log(err);
  });

//   .then(()=>{
//     const MoviesSchema = new mongoose.Schema({
//         id:Number,
//         name:String,
//         rating:Number,
//       });
//       var Movies=mongoose.model('Movies',MoviesSchema);
//       var movie1=new Movies({id:4,name:"반지의제왕",rating:5});
//       movie1.save(function(err,Movies){
//         if (err) return console.error(err);
//         console.log(movie1.name+"saved to movie collection.");
//       });
//   })