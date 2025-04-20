"use client";
import React from "react";
import { toast } from "sonner";
import { createEditRequest } from "@/functions/document";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { ConfettiSideCannons } from "@/lib/helper";
import Loading from "@/components/loading";
import formatDateToReadable from "@/lib/helper";
import { Block } from "@blocknote/core";

import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { fetchBlog } from "@/functions/document";
import { Button } from "@/components/ui/button";
import Editor from "@/components/global/editor";
import { Toaster } from "@/components/ui/sonner";
import { useParams } from "next/navigation";
import { BlockNoteEditor } from "@blocknote/core";
import { useEffect } from "react";
import { useMemo } from "react";
import { Lightbulb } from "lucide-react";
import { useState } from "react";
export default function page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [isSubmitPending, setIsSubmitPending] = useState(false);
  const [blogData, setBlogData] = useState({});
  const [editedContent, setBlocks] = useState<Block[]>();
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const params = useParams<{ id: string }>();
  const [initialContent, setInitialContent] = useState<Block[] | "loading">(
    "loading"
  );
  const handleClick = () => {
    const val = initialContent === editedContent;
    const conditionIsMet = val; // 🔁 replace this with your real check

    if (conditionIsMet) {
      toast.error("You must edit the content before submitting.");
      return;
    }

    setOpen(true);
  };
  useEffect(() => {
    const loadContent = async () => {
      try {
        const blogData = await fetchBlog(params.id);

        const parsedContent = JSON.parse(blogData.content);
        console.log(parsedContent, "pardef");
        setBlogData(blogData);
        setInitialContent(parsedContent);
        setBlocks(parsedContent);
        console.log(parsedContent);
      } catch (error) {
        console.error("Failed to load content:", error);
        setInitialContent([]); // Fallback to empty content
      }
    };

    loadContent();
    console.log("params is", params.id);
    if (sessionStorage.getItem(`confetti-${params.id}`) === "true") {
      ConfettiSideCannons();
      sessionStorage.removeItem(`confetti-${params.id}`);
    }
  }, [params.id]);

  const editor = useMemo(() => {
    if (initialContent === "loading") return undefined;
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  const isLoggedIn = !!session?.user;
  const imageUrl = session?.user?.image;

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-full px-20 py-3  flex items-center justify-between border-b h-[66px] ">
        <Image
          onClick={() => router.push("/")}
          className="cursor-pointer"
          alt="logo"
          src="/quark.png"
          width={50}
          height={50}
        />
        <div className="flex items-center justify-center ">
          {isLoggedIn ? (
            <Avatar>
              <AvatarImage
                className=" pointer rounded-full w-10"
                src={imageUrl as string}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <Button>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
      <header className="flex mt-10 w-[800px] max-w-[800px] items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Blog</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">How to Build a Diff Viewer</h1>
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
              Last updated: April 10, 2025
            </span>
          </div>
        </div>
        <Button disabled={initialContent === "loading"} onClick={handleClick}>
          Create Request
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="bg-[#0A0A0A]   ">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold">
                Submit Edit Request
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-zinc-400">
                Please provide a concise title and a detailed description of the
                changes you are suggesting.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm text-zinc-300">
                  Title
                </label>
                <Input
                  id="title"
                  className="bg-[#0A0A0A] text-zinc-100"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm text-zinc-300">
                  Description
                </label>
                <Textarea
                  id="description"
                  className="bg-[#0A0A0A] border-zinc-700 text-zinc-100 min-h-[80px]"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Button>Cancel</Button>
              </AlertDialogCancel>

              <Button
                disabled={isSubmitPending}
                onClick={async () => {
                  if (formTitle.length === 0 || formDescription.length === 0) {
                    formTitle.length === 0
                      ? toast.error("Title is required", {
                          action: {
                            label: "Okay",
                            onClick: () => "",
                          },
                        })
                      : toast.error("Description is required", {
                          action: {
                            label: "Okay",
                            onClick: () => "",
                          },
                        });
                    return;
                  }
                  const jsoneditedContent = JSON.stringify(editedContent);
                  const jsoninitialContent = JSON.stringify(initialContent);
                  setIsSubmitPending(true);
                  const responseForPr = await createEditRequest(
                    blogData.id,
                    jsoneditedContent,
                    jsoninitialContent,
                    session?.user.id,
                    formTitle,
                    formDescription
                  );
                  if (responseForPr.data.success) {
                    router.push("/pullrequests");
                    setIsSubmitPending(false);
                    toast.success("Edit request submitted successfully");
                    setOpen(false);
                    return;
                  } else toast.error("Failed to submit edit request");
                }}
              >
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </header>

      {!editor ? (
        <Loading />
      ) : (
        <div className="mt-8  w- flex flex-col items-start gap-3 justify-center">
          {/* <div className="border flex items-center justify-start px-10 py-2 w-full">
            <Lightbulb className="text-[#888888]" />
            <h1 className="text-sm font-medium text-[#888888] ml-2">
              Edit the Content below and submit your improvements . your changes
              are temporary and will be sent for reviewe to the blog auther
            </h1>
          </div> */}

          <div className="borde h-full overflow-scroll w-full">
            <Editor
              editable={true}
              bg="dark"
              editorinstance={editor}
              setBlocks={setBlocks}
            />
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}
