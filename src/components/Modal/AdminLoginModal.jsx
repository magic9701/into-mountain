import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Toast from 'utils/sweetAlertConfig.js'
// scss
import styles from 'components/Modal/AdminLoginModal.module.scss'
// components
import Button from 'components/Button/Button'
import InputBox from 'components/Input/InputBox'
// api
import { adminLogin } from 'api/admin'

export default function AdminLoginModal() {
  const [email, setEmail] = useState('root@example.com')
  const [password, setPassword] = useState('1234')
  const [isError, setIsError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (email.trim().length === 0 || password.trim().length === 0 || isError) {
      return
    }
    const { token, id, name, avatar, isSuspended, message } = await adminLogin({
      email,
      password
    })
    if (isSuspended) {
      Toast.fire({
        icon: 'error',
        title: '管理者已被停權!'
      })
    } else if (token) {
      localStorage.setItem('adminToken', token)
      localStorage.setItem('adminId', id)
      localStorage.setItem('adminAvatar', avatar)
      localStorage.setItem('adminName', name)
      Toast.fire({
        icon: 'success',
        title: '登入成功!'
      })
      navigate('/admin/allUser')
    } else if (!token) {
      Toast.fire({
        icon: 'error',
        title: message
      })
    }
  }

  return (
    <div className={styles.modalContainer}>
      <h2>後台登入</h2>
      <div className={styles.inputGroup}>
        <InputBox
          label="Email"
          value={email}
          onChange={(inputValue) => setEmail(inputValue)}
          setIsError={setIsError}
        />
        <InputBox
          label="密碼"
          type="password"
          value={password}
          onChange={(inputValue) => setPassword(inputValue)}
          setIsError={setIsError}
        />
        <Button style="primaryButton" text="登入" onClick={handleLogin} />
        <div className={styles.linksContainer}>
          <Link className={styles.links} to="/">
            回到首頁
          </Link>
        </div>
      </div>
    </div>
  )
}
