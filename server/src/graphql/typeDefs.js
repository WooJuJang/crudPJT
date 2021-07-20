import { gql } from 'apollo-server';
//어떤 타입으로 데이터를 받을 것인가에 대해 정의
const typeDefs = gql`
 #반환 타입 생성
  type Movie {
    id: Int!
    name: String!
    rating: Float!
  }
#Query 생성
  type Query {
    movies: [Movie!]!
    findOneMovieName(name: String!): Movie
    findRating(rating:Float!):[Movie]
    findMovieName(name:String!):[Movie]
    findFullName(name:String!):[Movie]
    findPartialName(name:String!):[Movie]
    findById(id:Int!):Movie
  }

  type Mutation {
    addMovie(id:Int!,name: String!, rating: Float!): Movie
    updateMovie(id:Int!,rating:Float!):Movie!
    deleteMovie(id:Int!):Movie
  }
`;
export default typeDefs;