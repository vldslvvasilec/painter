"use client";
import { useState, useEffect } from "react";
import LangChenger from "./header/langChenger";
import Logo from "./header/logo";
import Nav from "./header/nav";
import '@/styles/header.scss';

export default function Header() {
  const [isFixed, setIsFixed] = useState(false); // Фиксация хедера
  const [lastScrollY, setLastScrollY] = useState(0); // Последняя позиция прокрутки
  const [isScrolledDown, setIsScrolledDown] = useState(false); // Прокручено ли вниз на 10vh
  const [isHidden, setIsHidden] = useState(false); // Скрыт ли хедер (когда прокручено на 9%)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Проверяем, прокручена ли страница вниз на 9% (scrollY > 9% от высоты экрана)
      if (scrollY > windowHeight * 0.09) {
        setIsHidden(true); // Скрыть хедер при прокрутке вниз на 9%
      } else {
        setIsHidden(false); // Отображать хедер, если прокрутка меньше 9%
      }

      // Проверяем, прокручена ли страница вниз на 10vh
      if (scrollY > windowHeight * 0.1) {
        setIsScrolledDown(true); // Прокрутили вниз на 10vh
      } else {
        setIsScrolledDown(false); // Страница не прокручена на 10vh
      }

      // Фиксация хедера при прокрутке
      if (scrollY > lastScrollY && isScrolledDown) {
        setIsFixed(true); // Фиксируем хедер при прокрутке вниз
      } else if (scrollY < lastScrollY && !isHidden) {
        setIsFixed(false); // Делаем хедер абсолютным при прокрутке вверх
      }

      setLastScrollY(scrollY); // Обновляем последнюю позицию прокрутки
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isScrolledDown, isHidden]);

  return (
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
      <section className="navWrap">
        <Nav />
        <LangChenger />
      </section>
    </header>
  );
}
