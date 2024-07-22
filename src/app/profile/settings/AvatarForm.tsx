import * as NextImage from "next/image";
import UpdateProfileProperty from "./UpdateProfileProperty";
import { Pencil, Upload } from "lucide-react";
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

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function AvatarForm({
  userId,
  token,
}: Readonly<{ userId: string; token: string }>) {
  const avatarSchema = z.object({ file: imageSchema });
  const { errors, formError, control, formSuccess, handleSubmit, handleFetch } =
    useFormHandler({
      apiPath: `/api/files/users/${userId}`,
      schema: avatarSchema,
      fileName: "avatar.jpg",
      token: token,
      isFile: true,
      pushPath: "/profile",
    });
  const { field } = useController({ name: "file", control: control });
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
    console.log(data);
    handleFetch(data, async (data) => {
      const formData = new FormData();
      formData.append("file", data.file, "avatar.jpg");
      const res = await apiFetch(`/api/files/users/${userId}`, {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      return res;
    });
  };

  return (
    <UpdateProfileProperty text="Выберите аватарку" className="relative mb-4">
      <NextImage.default
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
            <Upload className="text-yellow absolute top-2 left-36 pointer-events-none" />
          </div>
          <input type="file" />
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <SubmitButton
                  onClick={async () => {
                    handleCrop();
                    const blob = await fetch(imageUrl).then(
                      async (res) => await res.blob()
                    );
                    field.onChange(blob);
                  }}
                />
              </form>
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
          <FormError error={errors.file} />
          {formError && <ErrorMessage>{formError}</ErrorMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {formSuccess && <p className="text-green-500">Успешно!</p>}
        </DialogContent>
      </Dialog>
    </UpdateProfileProperty>
  );
}
