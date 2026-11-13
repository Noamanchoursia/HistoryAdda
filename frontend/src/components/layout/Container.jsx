export const Container = ({ children, className }) => (
  <div className={`max-w-[1280px] mx-auto px-6 ${className || ''}`}>
    {children}
  </div>
)
