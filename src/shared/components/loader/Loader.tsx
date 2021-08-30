import Loader from 'react-loader-spinner'
const LoaderCompoenent = () => {
  return (
    <Loader
      type='MutatingDots'
      color='#00BFFF'
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  )
}
export default LoaderCompoenent
