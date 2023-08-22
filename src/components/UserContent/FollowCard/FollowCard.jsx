import styles from './FollowCard.module.scss'
import { SecondaryButton } from 'components/Button/Button'
import { useNavigate } from 'react-router-dom'
import iconUser, {
  ReactComponent as IconDefaultUser
} from 'assets/icons/user.svg'

const {
  followerCardCointainer,
  cardHead,
  cardAvatar,
  cardTitle,
  cardButton,
  defaultImg,
  userAvatar
} = styles

const FollowerCard = ({ data, follow, onFollow }) => {
  const navigate = useNavigate()
  let theId
  if (data.Following) {
    theId = data.Following.id
  } else {
    theId = data.Follower.id
  }
  return (
    <div
      className={followerCardCointainer}
      onClick={() => navigate(`/user/${theId}/myReviews`)}
    >
      <div className={cardHead}>
        <div className={cardAvatar}>
          {follow.avatar === null ? (
            <IconDefaultUser className={defaultImg} />
          ) : (
            <div className={userAvatar}>
              <img
                src={follow.avatar}
                onError={(e) => {
                  e.target.src = iconUser
                }}
                alt="avatar"
              />
            </div>
          )}
        </div>
        <div className={cardTitle}>{follow.name}</div>
      </div>
      <div className={cardButton}>
        <SecondaryButton
          onClick={(event) => {
            event.stopPropagation()
            onFollow?.({ isFollow: data.isFollow, id: theId })
          }}
        >
          {data.isFollow ? '追蹤中' : '關注'}
        </SecondaryButton>
      </div>
    </div>
  )
}

export default FollowerCard
