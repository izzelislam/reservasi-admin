import CustomInput from '../../../components/custom-input'
import { useOrderStore } from '../../../store/use-order-store'
import LoadingState from '../../../components/loading-state'
import CheckInContent from './checkin-content'
import { useEffect } from 'react'



const CheckinModalCOntent = ({onClose}: {onClose?: () => void}) => {

  const { loading, searchResult, searchOrders, resetSearch} = useOrderStore()
  // const [query, setQuery] = useState<string>('')

  const onSearch = async (q: string) => {
    await searchOrders(q)
  }

  useEffect(() => {
    resetSearch()
  }, [onClose])

  return (
    <div className='mb-4'>
      <CustomInput
      type="text"
      placeholder="Checkin berdasarkan nama / kode booking / email"
      label="Booking Online"
      onchange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
      />

      {
        loading
        ? <LoadingState />
        : searchResult.length > 0
        && <CheckInContent orders={searchResult} onClose={onClose} />
        // : <NoDataState />
      }

    </div>
  )
}

export default CheckinModalCOntent