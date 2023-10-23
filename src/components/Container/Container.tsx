import { cn } from "@/utils/mergeTailwind";

type ContainerProps = {
    children: React.ReactNode;
    maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    paddingX?: number;
}



const Container = ({ children, maxWidth }: ContainerProps) => {
  const maxWidthCSSMapping = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  };
  return (
    <div className={cn('mx-auto 2xl:w-4/5 w-11/12', maxWidthCSSMapping[maxWidth])}>
      {children}
    </div>
  )
}

export default Container