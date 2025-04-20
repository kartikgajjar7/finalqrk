"use client";
import "@blocknote/core/fonts/inter.css";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import { createBlogPost } from "@/functions/document";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Block } from "@blocknote/core";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useCreateBlockNote } from "@blocknote/react";
import Editor from "@/components/global/editor";
import { Loader2 } from "lucide-react";
export default function EditorPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isPublished, setisPublished] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  let editor;
  try {
    editor = useCreateBlockNote({});
  } catch (error) {
    console.log("error is", error);
  }

  const publishBlog = async () => {
    if (!(title && blocks.length > 0)) {
      if (!(title.length > 0)) {
        toast.error("Title is required", {
          action: {
            label: "Okay",
            onClick: () => "",
          },
        });
      } else {
        toast.error("Content is required", {
          action: {
            label: "Okay",
            onClick: () => "",
          },
        });
      }
      return;
    }
    setIsLoading(true);
    try {
      let response = await createBlogPost(title, blocks);
      console.log("response is", response);
      if (response.success) {
        setisPublished(true);
        toast.success("Blog created successfully", {
          action: {
            label: "Okay",
            onClick: () => "",
          },
        });
        sessionStorage.setItem(`confetti-${response.document.id}`, "true");
        router.push(
          `/document/${response.document.userId}/${response.document.id}`
        );
      }
    } catch (error) {
      console.log("error is", error);
      toast.error("Failed to publish blog");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full sticky top-0 px-32 flex items-center justify-end h-[66px] ">
        <Button disabled={isPublished || isLoading} onClick={publishBlog}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Publishing...
            </div>
          ) : isPublished ? (
            "Published"
          ) : (
            "Publish"
          )}
        </Button>
      </div>
      <div className="w-full h-full pt-12 flex flex-col items-center justify-start   gap-10  px-20">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title Here..."
          className="bg-transparent ml-[-32px]  focus:outline-none placeholder:text-[#373737]
 font-bold border-none text-6xl"
          type="text"
        />
        <Editor
          blocks={[]}
          bg="black"
          editable={true}
          editorinstance={editor}
          setBlocks={setBlocks}
        />
        <Toaster />
      </div>
    </>
  );
}
