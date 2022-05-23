import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation MyMutatoin(
    $title: String!
    $body: String!
    $subreddit_id: ID!
    $image: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
    }
  }
`

export const ADD_COMMENT = gql`
  mutation MyMutatoin($post_id: ID!, $text: String!, $username: String!) {
    insertComment(post_id: $post_id, text: $text, username: $username) {
      text

      created_at
      id
      post_id
      username
    }
  }
`
export const ADD_SUBREDDIT = gql`
  mutation MyMutatoin($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

export const ADD_VOTE = gql`
  mutation MyMutatoin($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      id
      post_id
      username
      upvote
      created_at
    }
  }
`

export const GET_ALL_POSTS_BY_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostListByPostId(post_id: $post_id) {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      comments {
        text
        created_at
        id
        post_id
        username
      }
      subreddit {
        created_at
        id
        topic
      }

      votes {
        created_at
        id
        post_id
        username
        upvote
      }
    }
  }
`

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      topic
      created_at
      id
    }
  }
`

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      comments {
        text
        created_at
        id
        post_id
        username
      }
      subreddit {
        created_at
        id
        topic
      }

      votes {
        created_at
        id
        post_id
        username
        upvote
      }
    }
  }
`
