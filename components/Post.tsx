import {
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import { ArrowDownIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import Avatars from './Avatars'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Jelly } from '@uiball/loaders'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { GET_VOTE_BY_POST_ID } from '../graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE } from '../graphql/mutation'

type Props = {
  post: Post
}

function Post({ post }: Props) {
  const { data: session } = useSession()

  const [vote, setVote] = useState<boolean>()

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTE_BY_POST_ID],
  })

  const upVote = async (isUpVote: boolean) => {
    if (!session?.user) {
      toast(' You need to be logged in to vote!')
      return
    }

    if (vote && isUpVote) return
    if (vote === false && !isUpVote) return

    try {
      await addVote({
        variables: {
          post_id: post.id,
          username: session?.user?.name,
          upvote: isUpVote,
        },
      })
    } catch (err) {}
  }
  const { data, loading } = useQuery(GET_VOTE_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  })

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId

    console.log(data)

    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote
    setVote(vote)
  }, [data])

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    )

    if (votes?.length === 0) return 0

    if (displayNumber === 0) {
      return votes[0].upvote ? 1 : -1
    }

    return displayNumber
  }
  if (!post)
    return (
      <div className=" flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )

  return (
    <Link href={`/post/${post.id}`}>
      <div className=" hidden-sm flex cursor-pointer rounded-md border border-gray-300 bg-white hover:border hover:border-gray-600">
        {/* votes */}
        <div className=" flex flex-col items-center justify-start space-y-1  rounded-l-md bg-gray-50  p-4 text-gray-400">
          <ArrowUpIcon
            className={` voteButtons hover:text-red-400 ${
              vote && 'text-red-400'
            } `}
            onClick={() => upVote(true)}
          />
          <p className=" text-xs font-bold text-black">{displayVotes(data)}</p>
          <ArrowDownIcon
            className={` voteButtons hover:text-blue-400 ${
              !vote && 'text-blue-400'
            } `}
            onClick={() => upVote(false)}
          />
        </div>

        <div className="p-3 pb-1">
          {/* header */}

          <div className=" flex items-center space-x-2">
            <Avatars seed={post?.subreddit[0]?.topic} />

            <p className="text-xs text-gray-400  ">
              <Link href={`/subreddit/${post?.subreddit[0]?.topic}`}>
                <span className=" font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post?.subreddit[0]?.topic}
                </span>
              </Link>
              - Posted by /u
              {' ' + post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>

          {/* body */}
          <div className=" py-4">
            <h2 className=" text-xl font-semibold">{post.title}</h2>
            <p className=" mt-2 text-sm font-light">{post.body}</p>
          </div>

          {/* image */}
          <img className="w-full" src={post.image} alt="" />

          {/* footer */}
          <div className=" flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltIcon className=" h-6 w-6" />
              <p className="">{post.comments.length} Comments</p>
            </div>
            <div className="postButtons">
              <GiftIcon className=" h-6 w-6" />
              <p className="">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className=" h-6 w-6" />
              <p className="">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className=" h-6 w-6" />
              <p className="">Share</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalIcon className=" h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
