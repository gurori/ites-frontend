import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 4;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg"];

export const optionalString = (schema: z.ZodString) =>
  schema.optional().or(z.literal(""));

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

export const textSchema = z.string().min(3, "Введите не менее 3 символов");

export const mdTextSchema = textSchema.max(
  300,
  "Введите не более 300 символов"
);

export const smTextSchema = textSchema.max(
  50,
  "Введите не более 50 символов"
);

export const lgTextSchema = textSchema.max(
  1000,
  "Введите не более 1000 символов"
);

export const filesSchema = z
  .any()
  .refine(
    (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    "Размер файла не должен превышать 4MB"
  );

export const fileSchema = z
  .any()
  .refine((file) => file, "Небходимо выбрать хотя бы 1 файл")
  .refine(
    (file) => file?.size <= MAX_FILE_SIZE,
    "Размер файла не должен превышать 4MB"
  );

export const imagesSchema = filesSchema.refine(
  (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  "Поддерживаются только .png, .jpg, .jpeg расширения файлов"
);

export const imageSchema = fileSchema.refine(
  (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  "Поддерживаются только .png, .jpg, .jpeg расширения файлов"
);

export const roleSchema = z.string({ message: "Необходимо выбрать 1 роль" });

export const dateSchema = z.date({ required_error: "Выберите дату" });

export const priceSchema = z
  .coerce
  .number({required_error: "Введите число"})
  .min(50, "Введите не менее 50₽")
  .max(10000000, "Введите не более 10,000,000₽")
  .step(0.01, "Максимум 2 десятичных знака");