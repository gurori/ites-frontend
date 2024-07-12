import { z } from "zod";

export const emailSchema = z
  .string()
  .email("Некоректный адрес электронной почты");

export const passwordSchema = z
  .string()
  .min(8, "Пароль должен иметь более 8 символов")
  .max(20, "Пароль должен иметь менее 20 символов");

export const nameSchema = z
  .string()
  .min(2, "Введите не менее 2 символов")
  .max(50, "Введите не более 50 символов")
  .regex(
    /^[a-zA-Zа-яА-Я\s-]+$/,
    "ФИО должно содержать только буквы, пробелы и дефисы"
  );

export const textSchema = z
  .string()
  .min(3, "Введите не менее 3 символов")
  .max(300, "Введите не более 300 символов");