import { Sling as Hamburger } from "hamburger-react";
import '@/styles/header/min-menu.scss';

interface HamburgerMenuProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HamburgerMenu({ isOpen, setOpen }: HamburgerMenuProps) {
  return (
    <div className="hamburger-menu">
      <Hamburger toggled={isOpen} toggle={setOpen} />
    </div>
  );
}
