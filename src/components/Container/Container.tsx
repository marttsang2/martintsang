type ContainerProps = {
    children: React.ReactNode;
    maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Container = ({ children, maxWidth }: ContainerProps) => {
  return (
    <div className={`container mx-auto max-w-${maxWidth}`}>
      {children}
    </div>
  )
}

export default Container