type ContainerProps = {
    children: React.ReactNode;
    maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Container = ({ children, maxWidth }: ContainerProps) => {
  const widthMapping = {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
  }
  return (
    <div className={`container mx-auto`}>
      {children}
    </div>
  )
}

export default Container