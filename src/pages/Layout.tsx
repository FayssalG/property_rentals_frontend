'use client'

import Footer from '@/components/Footer/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactElement } from 'react';

interface IlayoutProps {
  children : ReactElement[] | ReactElement
}

export default function Layout({children} : IlayoutProps) {
  const queryClient = new QueryClient({
    defaultOptions :{
      queries : {
        staleTime : 60 * 1000
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
        {children}
        <Footer className='mt-10'/>
    </QueryClientProvider>
  )
}
