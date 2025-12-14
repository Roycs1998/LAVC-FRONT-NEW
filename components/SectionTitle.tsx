import { IoIosAirplane } from 'react-icons/io'


interface Props {
  title?: any
  subTitle: any
  icon?: any
  showIcon?: boolean
  lineaColor?: string
}

const SectionTitle = ({ title, subTitle, icon, showIcon = true, lineaColor = "f5c72c" }: Props) => {
  const Icon = icon ?? IoIosAirplane

  return (
    <div className={`flex flex-col gap-2 z-1 `}>
      <div className='flex items-center gap-2'>
        <div className='flex items-center'>
          <div className={`w-6 h-1 bg-[#${lineaColor}]`} />
        </div>

        <div className='flex items-center gap-1'>
          <p className='text-lg font-semibold text-textDisabled tracking-widest uppercase mb-0 z-1'>
            {subTitle}
          </p>

          {showIcon && (
            <div className='text-[#FFA500] animate-bounceX'>
              <Icon size={24} />
            </div>
          )}
        </div>
      </div>
      {title && (
            <h2 className='text-3xl md:text-4xl font-bold text-[#f5c72c] z-1'>{title}</h2>
          )}
     
    </div>
  )
}

export default SectionTitle
