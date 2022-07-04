import Header from '@/components/header'
import { useRouter } from 'next/router'

function Projects() {
  const { push } = useRouter()

  const handleAboutRouting = () => {
    push('/')
    const appBackground = document.getElementsByTagName('body')[0]
    appBackground.style.backgroundColor = '#fff'
  }

  return (
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
