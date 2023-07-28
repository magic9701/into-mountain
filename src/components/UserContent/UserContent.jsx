import styles from './UserContent.module.scss'
import MyReview from './MyReview/MyReview'
import MyCollection from './MyCollection/MyCollection'
import MyNotice from './MyNotice/MyNotice'
import MyFollowing from './MyFollowing/MyFollowing'
import MyFollower from './MyFollower/MyFollower'
import InfoSetting from './InfoSetting/InfoSetting'

const { userContentContainer } = styles

const UserContent = ({ acitveContent }) => {
  if (acitveContent === 'review') {
    return (
      <div className={userContentContainer}>
        <MyReview />
      </div>
    )
  } else if (acitveContent === 'collection') {
    return (
      <div className={userContentContainer}>
        <MyCollection />
      </div>
    )
  } else if (acitveContent === 'notice') {
    return (
      <div className={userContentContainer}>
        <MyNotice />
      </div>
    )
  } else if (acitveContent === 'following') {
    return (
      <div className={userContentContainer}>
        <MyFollowing />
      </div>
    )
  } else if (acitveContent === 'follower') {
    return (
      <div className={userContentContainer}>
        <MyFollower />
      </div>
    )
  } else if (acitveContent === 'infoSetting') {
    return (
      <div className={userContentContainer}>
        <InfoSetting />
      </div>
    )
  }
}

export default UserContent
