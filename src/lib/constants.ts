import { Metadata } from "next";
import type { JobTitle } from "./types/JobTitle";
import type { RoleEng, Role } from "./types/Role";

export const jobTitles: JobTitle[] = [
  "Менеджер",
  "Разработчик",
  "Дизайнер",
  "Маркетолог",
];

export const roles: Role[] = ["Участник", "Заказчик", "Организатор"];

export const rolesEng: RoleEng[] = ["member", "client", "organizer"];

export const mainTabsNames = ["Конкурсы", "Задания", "Заказы", "Новости"];

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://ites.vercel.app"),
  title: {
    default: "ITes — Платформа IT-соревнований, хакатонов и фриланса",
    template: "%s | ITes",
  },
  description:
    "Современная веб-платформа, объединяющая участников, организаторов и клиентов для проведения IT-соревнований, хакатонов, фриланс-заказов и формирования команд.",
  keywords: [
    "IT соревнования",
    "хакатоны",
    "фриланс заказы",
    "командообразование",
    "платформа для разработчиков",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "gurori", url: "https://github.com/gurori" }],
  creator: "gurori",
  publisher: "ITes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://ites.vercel.app",
    title: "ITes — Платформа IT-соревнований, хакатонов и фриланса",
    description:
      "Современная веб-платформа, объединяющая участников, организаторов и клиентов для проведения IT-соревнований, хакатонов, фриланс-заказов и формирования команд.",
    siteName: "ITes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
