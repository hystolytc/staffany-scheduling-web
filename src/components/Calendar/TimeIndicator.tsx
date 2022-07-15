const TimeIndicator = () => (
  <div className='mr-4'>
    {Array(24).fill(0).map((_, i) => (
      <div key={i} className='h-20'>
        {i > 0 && <p className='text-xs text-right'>{i} {i > 11 ? 'PM' : 'AM'}</p>}
      </div>
    ))}
  </div>
)

export default TimeIndicator