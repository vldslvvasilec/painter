"use client";
import About from "@/components/main/about";
import Contacts from "@/components/main/contacts";
import Gallery from "@/components/main/gallery";
import "@/styles/main.scss";

export default function Page() {

  return (
    <main>
      <About />
      <Gallery />
      <Contacts />
    </main>
  );
}
