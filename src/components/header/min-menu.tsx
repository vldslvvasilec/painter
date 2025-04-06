import Nav from "./nav";
import LangChanger from "./langChenger";

interface MinMenuProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MinMenu({ isOpen, setOpen }: MinMenuProps) {
    const closeMenu = () => {
        setOpen(false);
      };
  return (
    <section className={`menu min-menu ${isOpen ? "open" : ""}`}>
      <Nav closeMenu={closeMenu} />
      <LangChanger />
    </section>
  );
}
