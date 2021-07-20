import movies from '../database/movies.js';
//값을 반환하는 역할
const resolvers = {
  Query: {//조회 기능
    movies: () => {return movies.find()},
    findOneMovieName: (_, { name }) => {
      return movies.findOne({name});
    },
    findRating:(_,{rating})=>{
      return movies.find({rating});
    },
    findMovieName:(_,{name})=>{
      return movies.find({name});
    },
    findFullName:(_,{name})=>{
      return movies.find({$text:{$search:name}});
     },
    findPartialName:(_,{name})=>{
      return movies.find({name:{$regex:name,$options:"i"}});
    },
    findById:(_,{id})=>{
      return movies.findOne({id});
    }
  },
  Mutation: {//조회 이외에 쓰기,업데이트,삭제 기능
    addMovie:async(_, args) => { 
      //기존에 같은 데이터가 존재하는지 체크 한 후 데이터 추가
      const result=await movies.findOne({name:args.name});
      if (result ==null){
            const newMovie = new movies({
              id:args.id,
              name:args.name,
              rating:args.rating,
            });
            return await newMovie.save();
      }else{
          console.log("The same movie already exists :(");
          return null;
      }
        // ----------------------- 콘솔에 정상적으로 출력 되고 데이터 저장까지 정상적으로 완료되지만 graphql에는 null값으로 나옴 ----------------------
        //#1
              //        // 데이터베이스에 추가
              // const newMovie = new movies({
              //   id:args.id,
              //   name:args.name,
              //   rating:args.rating,
              // });
              // const result=newMovie.save();
              // console.log(result);
              // return result;


        // #2
        // const result=await movies.findOne({name:args.name}).exec();
        //              // 데이터베이스에 추가
        //       const newMovie = new movies({
        //         id:args.id,
        //         name:args.name,
        //         rating:args.rating,
        //       });
        //  return newMovie.save();


        //#3
        //   async function findmovie(args){
        //     return await movies.findOne({name:args.name}).exec();
        //   }   
        //   const result=findmovie(args).then((result)=>{
        //       if(result==null){
        //         async function savemovie(){
        //       // 데이터베이스에 추가
        //       const newMovie = new movies({
        //         id:args.id,
        //         name:args.name,
        //         rating:args.rating,
        //       });
        //       return await newMovie.save();
        //       }
        //       return savemovie();
        //   }


        //#4
        // movies.findOne({name:args.name}).exec()
        // .then((result)=>{
        //   if(result==null){
        //       // 데이터베이스에 추가
        //       const newMovie = new movies({
        //         id:args.id,
        //         name:args.name,
        //         rating:args.rating,
        //       });
        //     
        //       newMovie.save().then(savedmovie=>{
        //         console.log(savedmovie===newMovie);
        //       })

        //#5
        // newMovie.save(function(err,movie){
        //   console.log(movie);
        //   return movie;
        // });

        //#6 error: SyntaxError: Unexpected reserved word --> async을 사용하지 않고 await만 사용한 경우 뜨는 에러
        // return await newMovie.save();

        // #7
        //     async function savemovie(){
        //       // 데이터베이스에 추가
        //       const newMovie = new movies({
        //         id:args.id,
        //         name:args.name,
        //         rating:args.rating,
        //       });
        //       return await newMovie.save();
        //       }
        //       return savemovie();
         
    },
    updateMovie:async(_,args)=>{
        return await movies.findOneAndUpdate({id:args.id},{rating:args.rating});
    },
    deleteMovie:async(_,args)=>{
        return await movies.findOneAndDelete({id:args.id});
    }
  }
};

export default resolvers;