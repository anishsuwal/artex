
const SIZE = {
    sm: "p-2 text-base xs:px-4",
    md: "p-3 text-base xs:px-8",
    lg: "p-3 text-lg xs:px-8"
  }
  
  
  
  export default function Button({
    children,
    className,
    size = "xs",
    hoverable = true,
    variant = "purple",
    ...rest
  }) {
  
    const sizeClass = SIZE[size]
    const variants = {
      white: `text-black bg-white`,
      green: `text-white bg-green-600 ${hoverable && "hover:bg-green-700"}`,
      purple: ` ${hoverable && "hover:bg-[#04009a]"}`,
      red: `text-white bg-red-600 ${hoverable && "hover:bg-red-800"}`,
      lightPurple: `text-indigo-700 bg-gradient-to-r from-cyan-500 to-blue-100 ${hoverable && "hover:bg-gradient-to-r from-cyan-500 to-blue-200"}`,
    }
  
    return (
      <button
        {...rest}
        className={`${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed border 
        rounded-full  p-3 text-sm font-semibold lg:font-bold ${className} ${variants[variant]}`}>
        {children}
      </button>
    )
  }
  