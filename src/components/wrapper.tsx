import React from 'react'

type Props = {
  children: React.ReactNode,
  title?: string,
  subtitle?: string
}

const Wrapper:React.FC<Props> = ({children, title, subtitle}: Props) => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-600">{title}</h1>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
      <div className="bg-white dark:bg-gray-950 rounded-2xl p-8">
        {children}
      </div>
    </>
  )
}

export default Wrapper