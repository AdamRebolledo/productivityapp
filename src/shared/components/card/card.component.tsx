import { ReactNode } from 'react'
import './card.css'

type props = {
  children: ReactNode
  className?: string
  onClick?: any
}
const Card = ({ children, className, onClick }: props) => {
  return (
    <div className={`card-box ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card
