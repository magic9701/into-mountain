// components
import Nav from 'components/Nav/Nav'
import styles from './UserPage.module.scss'
import InfoCard from 'components/InfoCard/InfoCard'
import UserPageTab from 'components/UserPageTab/UserPageTab'
import UserContent from 'components/UserContent/UserContent'
import Footer from 'components/Footer/Footer'

// hook
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// api
import { getUserData } from 'api/user'

// style
const {
  navDesk,
  navMobile,
  contentContainer,
  left,
  info,
  tab,
  right,
  logout,
  footer
} = styles

export default function UserPage() {
  const [theUserData, setTheUserData] = useState({})
  const [currentScroll, setCurrentScroll] = useState({
    currentValue: window.scrollY,
    upOrDown: true
  })
  const [updateCardInfo, setUpdateCardInfo] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const thePathArray = location.pathname.split('/')
  const [acitveContent, setAcitveContent] = useState()
  const id = thePathArray[2]

  // handle
  const handleAcitveContent = (type) => {
    setAcitveContent(type)
    navigate(`/user/${thePathArray[2]}/${type}`)
  }
  const handleUpdateCardInfo = () => {
    setUpdateCardInfo(!updateCardInfo)
  }
  // useEffect
  // 根據url變化，render右側內容
  useEffect(() => {
    setAcitveContent(thePathArray[thePathArray.length - 1])
  }, [location])

  // 當卷軸滑動，捕捉當前滑動的位置是否置頂
  useEffect(() => {
    function handleScroll() {
      setCurrentScroll((pre) => ({
        currentValue: window.scrollY,
        upOrDown: pre.currentValue > window.scrollY
      }))
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentScroll])

  // 載入user卡片資訊
  useEffect(() => {
    const getUserDataAsync = async (id) => {
      try {
        const data = await getUserData(id)
        setTheUserData(data)
      } catch (error) {
        console.error(error)
      }
    }
    if (localStorage.getItem('currentUserId')) {
      getUserDataAsync(id)
    }
  }, [location, updateCardInfo])

  return (
    <div className="container mx-auto">
      <div className={navDesk}>
        <Nav className={navDesk} updateCardInfo={updateCardInfo} />
      </div>
      <div className={navMobile}>{currentScroll.upOrDown && <Nav />}</div>
      <div className={contentContainer}>
        <div className={left} data-scroll={currentScroll.upOrDown}>
          <InfoCard
            className={info}
            data={theUserData}
            theUserId={id}
            acitveContent={acitveContent}
            onAcitveContent={handleAcitveContent}
          />
          <div className={tab} data-scroll={currentScroll.upOrDown}>
            <UserPageTab
              acitveContent={acitveContent}
              onAcitveContent={handleAcitveContent}
            />
          </div>
          <div
            className={logout}
            onClick={() => {
              localStorage.clear()
              navigate(`/`)
            }}
          >
            登出
          </div>
        </div>
        <div className={right}>
          <UserContent
            acitveContent={acitveContent}
            theUserId={id}
            theUserData={theUserData}
            onUpdateCardInfo={handleUpdateCardInfo}
          />
        </div>
      </div>
      <div className={footer}>
        <Footer />
      </div>
    </div>
  )
}
