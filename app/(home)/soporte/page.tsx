import { CardImage } from '@/components/components-home/components-ponentes/CardImage'
import { Medium } from '@/components/components-home/components-sponsors/Medium'
import { PostCard } from '@/components/components-home/components-sponsors/Medium/PostCard'

const Soporte = async () => {
  return (
    <div className="bg-[var(--background-form)]">
      <div>
        <CardImage
          image='https://www.lavanguardia.com/files/og_thumbnail/uploads/2022/04/15/625935c2d2651.jpeg'
          title='SOPORTE'
        />
      </div>
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center py-10 gap-10">
        <Medium />
      </div>
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center py-10 gap-10">
        <PostCard />
      </div>
    </div>
  )
}

export default Soporte
