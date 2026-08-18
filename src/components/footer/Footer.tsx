"use client";

import Image from "next/image";
import { MailIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative">
      <div className="bg-purple py-24">
        <div className="container relative z-10">
          <div className="text-white">
            <h3 className="pb-4">Остались еще вопросы?</h3>
            <p className="pt-8">Свяжитесь с нами!</p>
          </div>

          <Link
            href="mailto:itelectronicschool@gmail.com"
            className="flex gap-2 items-center text-black pt-4 no-underline"
          >
            <MailIcon size={20} />
            itelectronicschool@gmail.com
          </Link>
        </div>
        <Image
          src="/stars/middle-purple.svg"
          className="pointer-events-none absolute bottom-64 right-0 md:bottom-0 md:right-1/4 z-0"
          alt="star"
          width={550}
          height={550}
        />
      </div>
      <div className="bg-black relative z-10">
        <div className="container py-16">
          <div className="md:flex grid items-center md:gap-32 gap-16">
            <Image
              src="/logos/ites-purple-middle.svg"
              alt="ites logo"
              height={165}
              width={281.81}
            />
            <Image
              src="/logos/mlg.svg"
              alt="mlg logo"
              height={76.15}
              width={92}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
