import styles from 'pages/ErrorPage/ErrorPage.module.scss'
import MainLayout from 'components/MainLayout/MainLayout'
import robotIcon from 'assets/icons/icon-robot.svg'
import { PrimaryButton } from 'components/Button/Button'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <img src={robotIcon} alt="robotIcon" className={styles.icon} />
          <h2>Opps!你輸入的頁面不存在!</h2>
          <div className={styles.buttonGroup}>
            <div className={styles.buttonContainer}>
              <PrimaryButton onClick={() => navigate('/')}>
                回到首頁
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
