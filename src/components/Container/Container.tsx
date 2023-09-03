type ContainerProps = {
    children: React.ReactNode;
    maxWidth: 'sm' | 'md' | 'lg' | 'xl';
    paddingX?: number;
}

const Container = ({ children, maxWidth, paddingX }: ContainerProps) => {
  return (
    <div className={'mx-auto max-w-7xl 2xl:w-4/5 w-11/12'}>
      {children}
    </div>
  )
}

export default Container