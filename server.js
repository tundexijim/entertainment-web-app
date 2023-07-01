const { ApolloServer, gql }= require('apollo-server');
const {movieData} = require('./src/data.json')
const typeDefs = gql`
  type Query {
    movies: [movie]!
  }
  type movie{
    title: String!
    thumbnail: Thumbnail!
    year: Int!
    category: String!
    rating: String!
    isBookmarked: Boolean!
    isTrending: Boolean!
  }
  type Thumbnail{
    trending: ThumbnailSize
    regular: RegularThumbnailSize!
  }
  type ThumbnailSize{
    small: String!
    large: String!
  }
  type RegularThumbnailSize{
    small: String!
    medium: String!
    large: String!
  }
`;
const resolvers = {
  Query: {
    movies: () => {
      return movieData;
    },
  },
  // movie: {
  //   thumbnail: (parent) => {
      
  //     return parent.thumbnail;
  //   },
  // },
  // Thumbnail: {
  //   trending: (parent) => {
  //     return parent.trending;
  //   },
  //   regular: (parent) => {
  //     return parent.regular;
  //   },
  // },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log("Server is ready at " +url);
});