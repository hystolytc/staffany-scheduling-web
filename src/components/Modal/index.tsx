import { useEffect, useRef } from 'react'

interface Props {
  open?: boolean
  children?: React.ReactNode
}

export const Modal: React.FC<Props> = ({ 
  open,
  children
}) => {
  const modalRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      document.body.setAttribute('style', 'overflow-y: hidden')
    } else {
      document.body.style.removeProperty('overflow-y')
    }
  }, [open])

  if (!open) return null

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-stone-400/80 z-20'>
      <div 
        ref={modalRef}
        className='absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-max-[800px] w-1/3 min-w-[300px] bg-white rounded p-4'
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
