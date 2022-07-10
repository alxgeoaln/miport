import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import Header from '@/components/header'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

const Logo = dynamic(() => import('@/components/canvas/Logo'), {
  ssr: false,
  suspense: true,
})

function Projects() {
  const { push, pathname } = useRouter()

  const handleAboutRouting = () => {
    push('/')
    const appBackground = document.getElementsByTagName('body')[0]
    appBackground.style.backgroundColor = '#fff'
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
        }}
      >
        <Header handleAboutRouting={handleAboutRouting} />

        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              color: '#fff',
              fontSize: 100,
            }}
          >
            WIP
          </p>
        </div>
      </div>
      <LCanvas>
        <>
          <Logo pathname={pathname} planeNeedsUpdated={false} />
        </>
      </LCanvas>
    </>
  )
}

export default Projects

export async function getStaticProps() {
  return {
    props: {
      title: 'Projects',
    },
  }
}
