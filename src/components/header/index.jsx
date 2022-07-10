import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import gsap from 'gsap'

import styles from './styles'

const Header = ({
  handleAboutRouting,
  handleProjectsRouting,
  planeNeedsUpdated,
}) => {
  const { pathname } = useRouter()

  useEffect(() => {
    const header = document.getElementById('header')

    if (planeNeedsUpdated) {
      gsap.to(
        header,
        {
          scale: 0,
          rotate: 7.0,
          duration: 1.0,
          onComplete: () => {
            header.style.opacity = 0.0
            header.style.rotate = 7.0
            header.style.scale = 0.0
          },
        },
        0.1
      )
    } else {
      const tl = gsap.timeline()
      tl.to(
        header,
        {
          opacity: 0,
          scale: 0,
          rotate: 7.0,
          duration: 0.0,
        },
        0.0
      )
      tl.to(
        header,
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.0,
        },
        0.2
      )
    }
  }, [planeNeedsUpdated])

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
