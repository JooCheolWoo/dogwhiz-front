import HeaderTop from './header/HeaderTop';
import HeaderMiddle from './header/HeaderMiddle';
import StickyHeader from './header/StickyHeader';
import { ReactNode } from 'react';
import FooterTop from './footer/FooterTop';
import FooterMiddle from './footer/FooterMiddle';
import FooterBottom from './footer/FooterBottom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <HeaderTop />
    <HeaderMiddle />
    <div className="sticky top-0 z-10">
      <StickyHeader />
    </div>
    {children}
    <FooterTop />
    <FooterMiddle />
    <FooterBottom />
  </>
);

export default Layout;
