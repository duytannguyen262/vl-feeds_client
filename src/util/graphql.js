const { default: gql } = require("graphql-tag");

export const FETCH_POSTS_QUERY = gql`
  query FetchPostsQuery {
    getPosts {
      id
      body
      createdAt
      author {
        id
        username
        avatar
        role
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
          avatar
        }
      }
    }
  }
`;

export const FETCH_POSTS_PAGINATION = gql`
  query FetchPostsPagination($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      edges {
        node {
          id
          body
          createdAt
          author {
            id
            username
            avatar
            role
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
              avatar
            }
          }
        }
        cursor
      }
      pageInfo {
        startCursor
        hasNextPage
      }
      totalCount
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
