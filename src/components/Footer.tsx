'use client'

import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Footer.module.css";
import { Phone } from "lucide-react";

const Footer = () => {
  const phoneNumber = "+79841162646";
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const nodeRef = useRef(null);
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsMessageVisible(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMessageVisible) {
      timeoutId = setTimeout(() => {
        setIsMessageVisible(false);
      }, 400);
    }
    return () => clearTimeout(timeoutId);
  }, [isMessageVisible]);

  return (
    <footer className="relative">
      <div className="bg-purple py-24">
        <div className="container relative z-10">
          <div className="text-white">
            <h3 className="pb-4">Остались еще вопросы?</h3>
            <p>Свяжитесь с нами в социальных сетях!</p>
          </div>
          <div className="flex gap-7 items-center pt-16 pb-4">
            <button
              onClick={() => {
                handleCopyText("@Gurori124");
              }}
            >
              <img
                src="/logos/telegram.png"
                className="h-11"
                alt="telegram logo"
              />
            </button>
            <button
              onClick={() => {
                handleCopyText("No.");
              }}
            >
              <img
                src="/logos/facebook.png"
                className="h-11"
                alt="facebook logo"
              />
            </button>
            <button
              onClick={() => {
                handleCopyText(phoneNumber);
              }}
            >
              <img
                src="/logos/whatsapp.png"
                className="h-11"
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
          </div>
          <div className="flex gap-2 items-center text-black">
            <Phone size={18} />
            {phoneNumber}
          </div>
        </div>
        <img src="/stars/middle-purple.svg" className="pointer-events-none absolute bottom-36 right-0 md:bottom-0 md:right-1/4 z-0" />
      </div>
      <div className="bg-black relative z-10">
        <div className="container py-16">
          <div className="md:flex grid items-center md:gap-32 gap-16">
            <img src="/logos/ites-purple-middle.svg" alt="ites logo" />
            <img src="/logos/mlg.svg" alt="mlg logo" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;