import Container from '@/components/Container/Container'
import AboutSection from '@/components/Section/AboutSection'
import ProfileSection from '@/components/Section/ProfileSection'
import ProjectSection from '@/components/Section/ProjectSection'
import HomeSection from '@/components/Section/HomeSection'

export default function Home() {
  return (
    <Container maxWidth='5xl'>
      <HomeSection />
      <AboutSection />
      <ProfileSection />
      <ProjectSection />
    </Container>
  )
}
