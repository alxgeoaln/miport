import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import Header from '@/components/header'
import { useContext } from 'react'
import { AppContext } from '@/context/AppWrapperContext'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

const Logo = dynamic(() => import('@/components/canvas/Logo'), {
  ssr: false,
})

const Card = dynamic(() => import('@/components/canvas/Card'), {
  ssr: false,
})

function Work() {
  const { push, pathname } = useRouter()

  const { isMobile } = useContext(AppContext)

  const handleAboutRouting = () => {
    push('/')
    const appBackground = document.getElementsByTagName('body')[0]
    appBackground.style.backgroundColor = '#fff'
  }

  const positionX = 320

  return (
    <>
      <div className='flex w-full h-full justify-center bg-black'>
        <Header handleAboutRouting={handleAboutRouting} />
      </div>
      <LCanvas>
        <Logo pathname={pathname} />

        <Card positionX={-positionX} textureName='netguru.png' />
        <Card positionX={0} textureName='ibm.png' />
        <Card positionX={positionX} textureName='luxoft.png' />
      </LCanvas>
    </>
  )
}

export default Work

export async function getStaticProps() {
  return {
    props: {
      title: 'Work',
    },
  }
}
