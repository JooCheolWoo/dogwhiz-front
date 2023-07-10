import HeaderTop from './HeaderTop';
import HeaderMiddle from './HeaderMiddle';
import HeaderBottom from './HeaderBottom';

export default function Header() {
  return (
    <>
      <HeaderTop />
      <div className="sticky top-0 z-10">
        <HeaderMiddle />
        <HeaderBottom />
      </div>
    </>
  );
}
