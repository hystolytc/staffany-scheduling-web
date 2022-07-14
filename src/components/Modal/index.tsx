import { useEffect, useRef } from 'react'
import { isPropertySignature } from 'typescript'

interface Props {
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

export const Modal: React.FC<Props> = ({ 
  open,
  onClose=()=>{},
  children
}) => {
  const modalRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutsideModal = (e: MouseEvent) => {
      if (modalRef.current !== null && !modalRef.current?.contains(e.target as Node)) {
        if (onClose) onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutsideModal)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal)
    }
  }, [])

  useEffect(() => {
    if (open) {
      document.body.setAttribute('style', 'overflow-y: hidden')
    } else {
      document.body.style.removeProperty('overflow-y')
    }
  }, [open])

  if (!open) return <div />

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-stone-400 opacity-80 z-20'>
      <div 
        ref={modalRef}
        className='absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-max-[800px] w-1/3 min-w-[300px] bg-white rounded p-4 z-30'
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
