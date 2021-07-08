import { gql } from 'apollo-server';

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
    movie(id: Int!): Movie
  }

  type Mutation {
    addMovie(id:Int!,name: String!, rating: Float!): Movie!
    updateMovie(name:String!,rating:Float!):Movie!
    deleteMovie(name:String!):Movie
  }
`;
export default typeDefs;