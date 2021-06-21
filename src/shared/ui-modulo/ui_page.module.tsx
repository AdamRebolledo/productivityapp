import Button from '../components/buttons/buttons.component'
import Card from '../components/card/card.component'
import Header from '../components/header/header.component'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import MenuMobile from '../components/menu_mobile/menu_mobile.component'
const UiPage = () => {
  return (
    <>
      <Header />
      <div className='mx-auto container pt-28'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
          <Button className='col-span-1' variant='contained-secondary'>
            Button
          </Button>
          <Button className='col-span-1' variant='contained-primary'>
            Button
          </Button>
          <Button className='col-span-1' variant='outlined-primary'>
            Button
          </Button>
          <Button className='col-span-1' variant='contained-primary' size='small'>
            Button
          </Button>
          <Button className='col-span-1' variant='contained-primary' size='large'>
            Button
          </Button>
          <Button className='col-span-1' variant='contained-primary' size='medium'>
            Button
          </Button>
          <Button className='col-span-1' variant='rounded-full'>
            <ArrowBackIcon />
          </Button>
          <Button className='col-span-1' variant='rounded-full'>
            <ArrowForwardIcon />
          </Button>
        </div>

        <div className='mt-28'>
          <div className='grid grid-cols-1'>
            <Card className='p-4 block'>
              <p>hola card</p>
              <p>hola card</p>
              <p>hola card</p>
              <Button className='col-span-1' variant='contained-secondary'>
                Button
              </Button>
              <Button className='col-span-1 ml-5' variant='contained-primary'>
                Button
              </Button>
            </Card>
          </div>
        </div>

        <div className='mt-28'>
          <div className='grid grid-cols-1'></div>
        </div>
      </div>
      <MenuMobile />
    </>
  )
}

export default UiPage
