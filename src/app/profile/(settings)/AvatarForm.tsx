import Image from "next/image";
import UpdateProfileProperty from "./UpdateProfileProperty";
import { CropIcon, Pencil, Upload } from "lucide-react";
import { imageSchema } from "@/lib/zod-schemas";
import { z } from "zod";
import FormError from "@/components/ui/FormError";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { apiUrl } from "@/lib/constants";
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
import apiFetch from "@/lib/apiFetch";
import { useEffect } from "react";
import { toast } from "sonner";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function AvatarForm({
  userId,
  token,
}: Readonly<{ userId: string; token: string }>) {
  const avatarSchema = z.object({ file: imageSchema });
  const { errors, formError, control, formSuccess, handleSubmit, handleFetch } =
    useFormHandler({
      apiPath: `/api/Files/users/${userId}`,
      schema: avatarSchema,
      resetSuccess: true,
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

  const onSubmit = async (data: any) => {
    handleFetch(data, async (data) => {
      const formData = new FormData();
      formData.append("file", data.file, "avatar.jpg");
      const res = await apiFetch(`/api/Files/users/${userId}`, {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      return res;
    });
  };

  useEffect(() => {
    if (formSuccess)
      toast("Данные успешно сохранены!", {
        description: "Обновите страницу профиля, чтобы увидеть измения.",
      });
  }, [formSuccess]);

  return (
    <>
      <UpdateProfileProperty text="Выберите аватарку" className="relative mb-4">
        <Image
          width={200}
          height={200}
          src={imageUrl || `${apiUrl}/api/Files/users/${userId}/avatar.jpg`}
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
                className="yellow-border file:pr-16 file:pl-7"
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
                        const blob = await fetch(newImageUrl).then(
                          async (res) => await res.blob()
                        );
                        field.onChange(
                          new File([blob], "avatar.jpg", { type: blob.type })
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
