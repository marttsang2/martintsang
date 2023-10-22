type ContainerProps = {
    children: React.ReactNode;
    maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    paddingX?: number;
}



const Container = ({ children, maxWidth }: ContainerProps) => {
  return (
    <div className={`mx-auto max-w-${maxWidth} 2xl:w-4/5 w-11/12`}>
      {children}
    </div>
  )
}

export default Container