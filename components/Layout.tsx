import FooterTop from './footer/FooterTop';
import FooterMiddle from './footer/FooterMiddle';
import FooterBottom from './footer/FooterBottom';
import Header from './header/Header';
import Footer from './footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="nanum_gothic">
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
