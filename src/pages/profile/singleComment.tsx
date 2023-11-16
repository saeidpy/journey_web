import {t} from '@lingui/macro'
import {Stack, styled} from '@mui/material'
import {Comment} from 'src/shared/comment'
import {CommentResponse} from 'src/shared/types/server'
import {getProfileName} from 'src/shared/utils/getProfileName'

const Wrapper = styled(Stack)(({theme}) => ({
  padding: theme.spacing(3, 0),
}))

export const singleComment = (props: CommentResponse, key?: React.Key | null) => (
  <Wrapper key={key}>
    <Comment
      resort_id={props.resort_id}
      userId={props.author_id.toString()}
      commentId={props.comment_id}
      imageList={props.media_list?.map((media) => ({
        imageUrl: media.url,
        alt: media.url,
      }))}
      isLikable={false}
      date={props.experience_time ?? undefined}
      dislikeCount={props.dislike_count}
      name={getProfileName(props.author) || t`Unknown`}
      theme="dark"
      text={props.content}
      likeCount={props.like_count}
      rate={props.score}
      impression_of_the_caller={props.impression_of_the_caller}
      author_member_id={props.author?.member_id}
      profileImage={props.author?.profile_picture?.url}
    />
  </Wrapper>
)
