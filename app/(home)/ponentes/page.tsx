import { CardImage } from '@/components/components-home/components-ponentes/CardImage'
import PonentesList from './iu/PonentesList'

const Ponentes = async () => {

  return (
    <>
      <CardImage
        image='https://cdn.pixabay.com/photo/2017/06/16/05/11/white-tiger-2407799_1280.jpg'
        title='PONENTES'
      />
   {/*    <PonentesList /> */}
      <PonentesList />
    </>

  )
}

export default Ponentes
