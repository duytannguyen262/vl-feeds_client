const { default: gql } = require("graphql-tag");

export const FETCH_POSTS_QUERY = gql`
  query posts($limit: Int, $after: String) {
    posts(limit: $limit, after: $after) {
      edges {
        node {
          id
          body
          createdAt
          pictures {
            url
            public_id
          }
          author {
            id
            username
            avatar {
              url
            }
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
              avatar {
                url
              }
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
          avatar {
            url
          }
        }
      }
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      email
      avatar {
        url
      }
      banner {
        url
      }
      role
      followers {
        id
        username
        avatar {
          url
        }
      }
    }
  }
`;
