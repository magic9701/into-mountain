import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
// scss
import styles from 'components/SearchBar/SearchBar.module.scss'

// svg
import searchIcon from 'assets/icons/search-icon.svg'
import searchArrowIcon from 'assets/icons/search-arrow-icon.svg'

// 首頁用大search bar
export function SearchBarMain() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef(null)

  const handleSearchIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleTrailSearch = () => {
    if (keyword) {
      navigate(`/search/trails/${keyword}`)
    } else if (!keyword) {
      navigate('/search/allTrails')
    }
  }
  return (
    <div className={styles.searchBar}>
      <img
        className={styles.searchIcon}
        src={searchIcon}
        alt="searchIcon"
        onClick={handleSearchIconClick}
      />
      <input
        type="text"
        className={styles.searchInput}
        placeholder="請輸入路徑、山岳名稱"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        ref={inputRef}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleTrailSearch()
          }
        }}
      />
      <img
        className={`cursor-point ${styles.searchArrowIcon}`}
        src={searchArrowIcon}
        alt="searchArrowIcon"
        onClick={handleTrailSearch}
      />
    </div>
  )
}
