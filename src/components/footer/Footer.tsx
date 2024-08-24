"use client";

import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Footer.module.css";
import Image from "next/image";
import { MailIcon, Phone } from "lucide-react";

const Footer = () => {
  // const phoneNumber = "+79841162646";
  // const [isMessageVisible, setIsMessageVisible] = useState(false);
  // const nodeRef = useRef(null);
  // const handleCopyText = (text: string): void => {
  //   navigator.clipboard.writeText(text);
  //   setIsMessageVisible(true);
  // };

  // useEffect(() => {
  //   let timeoutId: NodeJS.Timeout;
  //   if (isMessageVisible) {
  //     timeoutId = setTimeout(() => {
  //       setIsMessageVisible(false);
  //     }, 400);
  //   }
  //   return () => clearTimeout(timeoutId);
  // }, [isMessageVisible]);

  return (
    <footer className="relative">
      <div className="bg-purple py-24">
        <div className="container relative z-10">
          <div className="text-white">
            <h3 className="pb-4">Остались еще вопросы?</h3>
            <p>Свяжитесь с нами в социальных сетях!</p>
          </div>
          {/* <div className="flex gap-7 items-center pt-16 pb-4">
            <button
              onClick={() => {
                handleCopyText("@Gurori124");
              }}
            >
              <Image
                src="/logos/telegram.png"
                width={49}
                height={49}
                alt="telegram logo"
              />
            </button>
            <button
              onClick={() => {
                handleCopyText("No.");
              }}
            >
              <Image
                src="/logos/facebook.png"
                width={49}
                height={49}
                alt="facebook logo"
              />
            </button>
            <button
              onClick={() => {
                handleCopyText(phoneNumber);
              }}
            >
              <Image
                src="/logos/whatsapp.png"
                width={49}
                height={49}
                alt="whatsapp logo"
              />
            </button>
            <CSSTransition
              in={isMessageVisible}
              timeout={400}
              nodeRef={nodeRef}
              classNames={{
                enter: styles.fadeEnter,
                enterActive: styles.fadeEnterActive,
                exit: styles.fadeExit,
                exitActive: styles.fadeExitActive,
              }}
              unmountOnExit
            >
              {() => <div ref={nodeRef}>Скопировано!</div>}
            </CSSTransition>
          </div> */}
          <div className="flex gap-2 items-center text-black">
            {/* <Phone size={18} />
            {phoneNumber} */}
            <MailIcon />
            itelectronicschool@gmail.com
          </div>
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
            <Image src="/logos/ites-purple-middle.svg" alt="ites logo" height={165} width={281.81} />
            <Image src="/logos/mlg.svg" alt="mlg logo" height={76.15} width={92} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
