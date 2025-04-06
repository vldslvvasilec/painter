"use client";
import { useState, useEffect } from "react";
import LangChenger from "./header/langChenger";
import Logo from "./header/logo";
import Nav from "./header/nav";
import "@/styles/header.scss";
import HamburgerMenu from "./header/hamburgerIcon";
import MinMenu from "./header/min-menu";

export default function Header() {
  const [isFixed, setIsFixed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setOpen] = useState(false); // Добавляем состояние для меню

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY > windowHeight * 0.1) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      if (scrollY > windowHeight * 0.105) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }

      if (scrollY > lastScrollY && isScrolledDown) {
        setIsFixed(true);
      } else if (scrollY < lastScrollY && !isHidden) {
        setIsFixed(false);
      }

      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isScrolledDown, isHidden]);

  return (
    <>
      <header
        className={
          isFixed
            ? "header fixed"
            : isHidden
            ? "header hidden"
            : isScrolledDown
            ? "header scrolled-down"
            : "header"
        }
      >
        <Logo />
        <HamburgerMenu isOpen={isOpen} setOpen={setOpen} />
        <section className="navWrap">
          <Nav />
          <LangChenger />
        </section>
      </header>
      <MinMenu isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
