import { useParams } from 'react-router-dom'
import Layout from '../../components/layout'
import Wrapper from '../../components/wrapper'
import GalleryRoomField from './_parts/galery-form'
import RoomFormField from './_parts/room_form'
import FacilityForm from './_parts/facility-form'

const RoomForm = () => {

  const params = useParams()
  const id = params.id
 

  return (
    <Layout>
      <Wrapper title="Room" subtitle='buat/edit kamar' back='/room'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div className='w-full'>
            <RoomFormField />
          </div>
          <div>
            {
              id &&
              <div>
                <GalleryRoomField/>
                <FacilityForm/>
              </div>
            }
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default RoomForm