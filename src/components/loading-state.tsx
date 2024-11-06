import { Icon } from "@iconify/react/dist/iconify.js"

const LoadingState = () => {
  return (
    <div className='fixed z-20 top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50'>
      <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center">
        <Icon icon="svg-spinners:180-ring-with-bg" className="text-5xl mb-3" />
        <h2 className="text-center font-semibold text-sm">Loading</h2>
      </div>
    </div>
  )
}

export default LoadingState