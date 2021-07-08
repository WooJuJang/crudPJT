import mongoose from 'mongoose';
const {Schema} = mongoose;
const MoviesSchema = new mongoose.Schema({
    id:Number,
    name:String,
    rating:Number,
  });
var movies=mongoose.model('Movies',MoviesSchema);

 export default movies;
// const movies = [
//     {
//       id: 1,
//       name: '백두산',
//       rating: 7
//     },
//     {
//       id: 2,
//       name: '히트맨',
//       rating: 7
//     },
//     {
//       id: 3,
//       name: '남산의 부장들',
//       rating: 9
//     },
//     {
//       id: 4,
//       name: '겨울왕국2',
//       rating: 7
//     }
//   ];
  
//   export default movies;
