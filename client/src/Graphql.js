import React,{useMemo} from 'react'
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

export const FINDMOVIENAME=gql`
 query FindMovieName($name:String!){
  findMovieName(name:$name){
            id
            name
            rating
        }
    }
`;
export const FINDPARTIALNAME=gql`
query FindPartialName($name:String!){
    findPartialName(name:$name){
              id
              name
              rating
          }
      }
  `;

export const MOVIES=gql`
 query movies{
  movies{
            id
            name
            rating
        }
    }
`;
export const FINDRATING=gql`
query findrating($rating:Float!){
    findRating(rating:$rating){
        id
        name
        rating
    }
}
`;

export const FINDBYID=gql`
query findById($id:Int!){
    findById(id:$id){
        id
        name
        rating
    }
}
`;

export const ADDMOVIE=gql`
mutation addMovie($id:Int!,$name:String!,$rating:Float!){
    addMovie(id:$id,name:$name,rating:$rating){
        id
        name
        rating
    }
}
`;

export const UPDATEMOVIE=gql`
mutation updateMovie($id:Int!,$rating:Float!){
    updateMovie(id:$id,rating:$rating){
        id
        name
        rating
    }
}
`;

export const DELETEMOVIE=gql`
mutation deleteMovie($id:Int!){
    deleteMovie(id:$id){
        id
        name
        rating
    }
}
`;



