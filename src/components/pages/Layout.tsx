
import Footer from '@/components/Footer/Footer';
import { ReactElement } from 'react';

interface IlayoutProps {
  children : ReactElement[] | ReactElement
}

export default function Layout({children} : IlayoutProps) {

  return (
    <>
        {children}
        <Footer className='mt-10'/>
    </>
  )
}