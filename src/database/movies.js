import mongoose from 'mongoose';
//const {Schema} = mongoose;
//movies.js에서는 스키마를 정의하여 스키마를 실행가능하게 만들어줌
//mongoDB와 매핑이 되어 있기 때문에 해당 타입을 가진 movies라는 colletions과 연결이 됨
const MoviesSchema = new mongoose.Schema({
    id:Number,
    name:String,
    rating:Number,
  });
//model의 인수값은 (모델의 이름,스키마)
var movies=mongoose.model('Movies',MoviesSchema);

 export default movies;
