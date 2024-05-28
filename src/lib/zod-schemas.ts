import { z } from "zod";

const emailSchema = z
  .string()
  .email("Некоректный адрес электронной почты");

const passwordSchema = z
  .string()
  .min(8, "Пароль должен быть не менее 8 символов");

const nameSchema = z
  .string()
  .min(2, "Введите не менее 2 символов")
  .max(50, "Введите не более 50 символов")
  .regex(
    /^[a-zA-Zа-яА-Я\s-]+$/,
    "ФИО должно содержать только буквы, пробелы и дефисы"
  );

export { emailSchema, passwordSchema, nameSchema };
