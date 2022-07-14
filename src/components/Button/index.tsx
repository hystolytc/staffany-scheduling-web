interface Props {
  title?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

export const Button: React.FC<Props> = ({
  title,
  type='button',
  onClick
}) => (
  <button
    className='p-2 bg-emerald-300 rounded border-2 border-gray-700 font-semibold'
    type={type}
    onClick={onClick}
  >
    {title}
  </button>
)