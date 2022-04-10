const { default: gql } = require("graphql-tag");

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      author {
        id
        username
        avatar
      }
      commentCount
      votesCount
      devotesCount
      reputationsCount
      categories
      votes {
        username
        createdAt
      }
      devotes {
        username
        createdAt
      }
      answers {
        id
        createdAt
        body
        author {
          id
          username
        }
      }
    }
  }
`;

export const FETCH_POST_COMMENTS = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      comments {
        id
        body
        createdAt
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;
