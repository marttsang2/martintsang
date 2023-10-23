import { cn } from "@/utils/mergeTailwind";

type ContainerProps = {
    children: React.ReactNode;
    maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    paddingX?: number;
}



const Container = ({ children, maxWidth }: ContainerProps) => {
  return (
    <div className={cn('mx-auto 2xl:w-4/5 w-11/12', `max-w-${maxWidth}`)}>
      {children}
    </div>
  )
}

export default Container