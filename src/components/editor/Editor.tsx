"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as IamgeExtension from "@tiptap/extension-image";
import { cn } from "@/lib/utils";
import {
  BoldIcon,
  ImageIcon,
  ItalicIcon,
  RedoIcon,
  RotateCcwIcon,
  SendHorizonalIcon,
  StrikethroughIcon,
  UndoIcon,
  UploadIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, type ChangeEvent } from "react";
import type {
  ControllerRenderProps,
  UseFormHandleSubmit,
} from "react-hook-form";

export default function Editor({
  field,
  handleSubmit,
  onSubmit,
}: Readonly<{
  field: ControllerRenderProps<
    {
      [x: string]: any;
    },
    "contentInHtml"
  >;
  handleSubmit: UseFormHandleSubmit<
    {
      [x: string]: any;
    },
    undefined
  >;
  onSubmit: (data: any) => void;
}>) {
  const editor = useEditor({
    extensions: [StarterKit, IamgeExtension.Image],
    content: `<h1>Заголовок</h1>
      <hr /><br />
      <p>Начните редактировать...</p>`,
    immediatelyRender: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) return null;

  const handleSelectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setIsOpen(false);
    });
    reader.readAsDataURL(file);
  };
  console.log(cn("editor", editor.isActive("bold") ? "is-active" : ""));
  console.log(editor.isActive("bold"));

  // <div className={cn(s.card, "p-4 md:p-10")}>
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={cn("editor", editor.isActive("bold") ? "is-active" : "")}
        >
          <BoldIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={cn("editor", editor.isActive("italic") ? "is-active" : "")}
        >
          <ItalicIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={cn("editor", editor.isActive("strike") ? "is-active" : "")}
        >
          <StrikethroughIcon />
        </button>
        <button
          className="editor"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Очистить марки
        </button>
        <button
          className="editor"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <RotateCcwIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={cn(
            "editor",
            editor.isActive("paragraph") ? "is-active" : ""
          )}
        >
          Текст
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            "editor",
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          )}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            "editor",
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          )}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            "editor",
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          )}
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={cn(
            "editor",
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          )}
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={cn(
            "editor",
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          )}
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={cn(
            "editor",
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          )}
        >
          H6
        </button>
        <button
          className="editor"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Разделитель
        </button>
        <button
          className="editor"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Перенос строки
        </button>
        <button
          className="editor"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <UndoIcon />
        </button>
        <button
          className="editor"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <RedoIcon />
        </button>
        <button
          className="editor"
          onClick={() => editor.chain().focus().clearContent().run()}
          disabled={!editor.can().chain().focus().clearContent().run()}
        >
          Очистить
        </button>
        <Dialog open={isOpen}>
          <DialogTrigger onClick={() => setIsOpen(true)}>
            <button className="editor">
              <ImageIcon />
            </button>
          </DialogTrigger>
          <DialogContent>
            <p>Выберите изображение</p>
            <div className="relative">
              <input
                onChange={handleSelectedImage}
                type="file"
                accept="image/*"
                className="yellow-border file:pr-20 file:pl-7"
              />
              <UploadIcon
                size={20}
                className="text-yellow absolute top-2.5 left-36 pointer-events-none"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <hr className="my-6" />
      <EditorContent editor={editor} />
      {/* <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }}></div> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          type="submit"
          className="bg-purple text-white rounded-3xl py-2 mt-10 px-6 gap-4 flex items-center"
          onClick={() => field.onChange(editor.getHTML())}
        >
          Опубликовать <SendHorizonalIcon size={18} />
        </button>
      </form>
    </>
  );
}
