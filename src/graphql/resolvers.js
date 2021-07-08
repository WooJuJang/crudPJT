import movies from '../database/movies.js';

const resolvers = {
  Query: {
    movies: () => {return movies.find()},
    movie: (_, { id }) => {
      return movies.findOne({id});
    }
  },
  Mutation: {
    addMovie: (_, args) => {
      // 영화 제목 중복 검사
      //if (movies.find(movie => movie.name === name)) return null;
      
      // 데이터베이스에 추가
      const newMovie = new movies({
        id:args.id,
        name:args.name,
        rating:args.rating,
      });
      return newMovie.save();
    },
    updateMovie:(_,args)=>{
        return movies.findOneAndUpdate({name:args.name},{rating:args.rating});
    },
    deleteMovie:(_,args)=>{
        return movies.findOneAndDelete({name:args.name});
    }
  }
};

export default resolvers;