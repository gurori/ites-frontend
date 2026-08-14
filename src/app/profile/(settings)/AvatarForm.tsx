"use client";

import Image from "next/image";
import UpdateProfileProperty from "./UpdateProfileProperty";
import { CropIcon, Pencil, Upload } from "lucide-react";
import { imageSchema } from "@/lib/zod-schemas";
import { z } from "zod";
import FormError from "@/components/ui/FormError";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import ErrorMessage from "@/components/ui/ErrorMessage";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactCrop from "react-image-crop";
import useImageCropper from "@/lib/hooks/useImageCropper";
import SubmitButton from "@/components/ui/buttons/SubmitButton";
import { useController } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;
const AVATAR_FILENAME = "avatar.jpg";

const avatarSchema = z.object({ file: imageSchema });

export default function AvatarForm({
  userId,
  token,
}: Readonly<{ userId: string; token: string }>) {
  const [timestamp, setTimestamp] = useState(Date.now());

  const {
    formError,
    formState: { errors },
    control,
    formSuccess,
    handleSubmit,
    onSubmit,
  } = useFormHandler({
    schema: avatarSchema,
    apiPath: `/api/files/users/${userId}`,
    token,
    fileName: AVATAR_FILENAME,
  });

  const { field } = useController({ control, name: "file" });

  const {
    imageUrl,
    crop,
    imgRef,
    handleSelectedImage,
    handleCropChange,
    error,
    handleCrop,
    handleImageLoad,
    previewCanvasRef,
  } = useImageCropper(ASPECT_RATIO, MIN_DIMENSION);

  useEffect(() => {
    if (formSuccess) {
      setTimestamp(Date.now());
      toast.success("Данные успешно сохранены!");
    }
  }, [formSuccess]);

  return (
    <>
      <UpdateProfileProperty text="Выберите аватарку" className="relative mb-4">
        <Image
          width={200}
          height={200}
          src={
            imageUrl ||
            `/api/files/users/${userId}/${AVATAR_FILENAME}?v=${timestamp}`
          }
          alt="avatar"
          className="rounded-full size-[200px]"
        />
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="size-[38px] rounded-full bg-gray-500 center absolute bottom-0 left-40"
            >
              <Pencil className="text-white" size={20} />
            </button>
          </DialogTrigger>
          <DialogContent title="Выберите аватарку">
            <div className="relative">
              <input
                onChange={handleSelectedImage}
                type="file"
                accept="image/*"
                className="yellow-border file:pr-20 file:pl-7"
              />
              <Upload
                size={20}
                className="text-yellow absolute top-2.5 left-36 pointer-events-none"
              />
            </div>
            {imageUrl && (
              <>
                <ReactCrop
                  crop={crop}
                  circularCrop
                  keepSelection
                  aspect={ASPECT_RATIO}
                  minWidth={MIN_DIMENSION}
                  onChange={handleCropChange}
                >
                  <img
                    src={imageUrl}
                    ref={imgRef}
                    className="w-full"
                    alt="upload"
                    onLoad={handleImageLoad}
                  />
                </ReactCrop>

                <DialogClose asChild>
                  <SubmitButton
                    className="justify-self-start"
                    icon={<CropIcon size={20} />}
                    onClick={async () => {
                      const newImageUrl = handleCrop();
                      if (newImageUrl) {
                        const blob = await fetch(newImageUrl).then((res) =>
                          res.blob(),
                        );
                        field.onChange(
                          new File([blob], AVATAR_FILENAME, {
                            type: blob.type,
                          }),
                        );
                      }
                    }}
                  >
                    Обрезать
                  </SubmitButton>
                </DialogClose>

                {crop && (
                  <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                      display: "none",
                      border: "1px solid black",
                      objectFit: "contain",
                      width: 150,
                      height: 150,
                    }}
                  />
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </UpdateProfileProperty>
      <FormError error={errors.file} />
      {formError && <ErrorMessage>{formError}</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <SubmitButton type="submit" className="yellow-border text-yellow" />
      </form>
    </>
  );
}
