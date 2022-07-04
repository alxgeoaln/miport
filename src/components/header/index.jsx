import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import styles from './styles'

const Header = ({ handleAboutRouting, handleProjectsRouting }) => {
  const { pathname } = useRouter()

  return (
    <div id='header' className='fixed z-40 flex w-full justify-center'>
      <a
        onClick={handleAboutRouting}
        className={pathname === '/' ? 'border-b-2 border-black' : 'text-white'}
      >
        <p id='about' style={{ cursor: 'pointer' }} className='mt-2 text-2xl'>
          About
        </p>
      </a>
      <div className='mt-5' style={styles(pathname).dot} id='large-dot' />
      <a
        onClick={handleProjectsRouting}
        className={
          pathname === '/projects' ? 'border-b-2 border-white text-white' : ''
        }
      >
        <p
          id='projects'
          style={{ cursor: 'pointer' }}
          className='mt-2 text-2xl '
        >
          Projects
        </p>
      </a>
    </div>
  )
}

export default Header

Header.propTypes = {
  handleAboutRouting: PropTypes.func,
  handleProjectsRouting: PropTypes.func,
}

Header.defaultProps = {
  handleAboutRouting: () => null,
  handleProjectsRouting: () => null,
}
