import YouHaveNothing from 'components/UserContent/YouHaveNothing/YouHaveNothing'
import RightSideContainer from 'components/UserContent/RightSideContainer/RightSideContainer'
import styles from './MyFollower.module.scss'
import FollowerCard from 'components/UserContent/FollowCard/FollowCard'
import { getUserFollowers } from 'api/user'
import { useState, useEffect } from 'react'
import { followUser, unFollowUser } from 'api/followship'
const { myFollowerContainer } = styles

const MyFollower = ({ theUserId, onUpdateCardInfo }) => {
  const [followersList, setFollowersList] = useState([])
  const [dataIsLoading, setDataIsLoading] = useState(true)
  const handleFollow = async ({ isFollow, id }) => {
    try {
      if (isFollow) {
        await unFollowUser(id)
      } else {
        await followUser(id)
      }
    } catch (error) {
      console.error(error)
    }
    onUpdateCardInfo()
    setFollowersList((prev) =>
      prev.map((item) => {
        if (item.followerId === id) {
          return { ...item, isFollow: !isFollow }
        }
        return item
      })
    )
  }

  useEffect(() => {
    const getUserFollowersAsync = async () => {
      try {
        const data = await getUserFollowers(theUserId)
        setFollowersList(data)
        setDataIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    getUserFollowersAsync()
  }, [])

  return (
    <RightSideContainer title="粉絲">
      {followersList.length === 0 && !dataIsLoading && (
        <div>
          <YouHaveNothing robotDescription="沒有粉絲" />
        </div>
      )}
      <div className={myFollowerContainer}>
        {followersList.map((item) => (
          <FollowerCard
            key={item.id}
            data={item}
            follow={item.Follower}
            onFollow={handleFollow}
          />
        ))}
      </div>
    </RightSideContainer>
  )
}
export default MyFollower
