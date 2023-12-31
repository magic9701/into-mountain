import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Toast from 'utils/sweetAlertConfig.js'
// scss
import styles from 'pages/LoginPage/LoginPage.module.scss'
// components
import LoginModal from 'components/Modal/LoginModal'
import SignUpModal from 'components/Modal/SignUpModal'

// img
import LoginPhoto from 'assets/photos/LoginPage-photo.JPG'
import LoginPhotoPlaceholder from 'assets/photos/LoginPage-photo-placeholder.jpg'
import SignUpPhoto from 'assets/photos/SignUpPage-photo.jpg'
import SignUpPhotoPlaceholder from 'assets/photos/SignUpPage-photo-placeholder.jpg'
import MainLayout from 'components/MainLayout/MainLayout'

export default function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [photoLoaded, setPhotoLoaded] = useState(false)

  // 如果已經登入，導向首頁
  useEffect(() => {
    const checkUserToken = () => {
      const token = localStorage.getItem('token')
      if (token) {
        navigate('/')
        Toast.fire({
          icon: 'info',
          title: '您已經登入囉!'
        })
      }
    }
    checkUserToken()
  }, [navigate])

  return (
    <MainLayout>
      <div className={styles.outerContainer}>
        <img
          className={styles.photo}
          src={
            photoLoaded
              ? location.pathname.includes('login')
                ? LoginPhoto
                : SignUpPhoto
              : location.pathname.includes('login')
              ? LoginPhotoPlaceholder
              : SignUpPhotoPlaceholder
          }
          alt="photo"
          onLoad={() => setPhotoLoaded(true)}
        />
        <div className={styles.modalContainer}>
          {location.pathname.includes('login') ? (
            <LoginModal />
          ) : (
            <SignUpModal />
          )}
        </div>
      </div>
    </MainLayout>
  )
}
