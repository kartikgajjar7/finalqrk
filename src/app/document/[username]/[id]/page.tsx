"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConfettiSideCannons } from "@/lib/helper";
import Loading from "@/components/loading";
import formatDateToReadable from "@/lib/helper";
import { Block } from "@blocknote/core";
import { Link as Linkk } from "lucide-react";
import { copyCurrentUrlToClipboard } from "@/lib/helper";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { AudioLines } from "lucide-react";
import { fetchBlog } from "@/functions/document";
import { Button } from "@/components/ui/button";
import Editor from "@/components/global/editor";
import { Toaster } from "@/components/ui/sonner";
import { useParams } from "next/navigation";
import { BlockNoteEditor } from "@blocknote/core";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
export default function page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setdata] = useState({});
  const params = useParams<{ id: string }>();
  const [initialContent, setInitialContent] = useState<Block[] | "loading">(
    "loading"
  );
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: "67bf8f1c-f6cb-44f2-82ad-23eec5c043ea",
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [
        {
          type: "text",
          text: "Welcome to this demo!",
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: "640e8045-8cd6-4cda-97a4-4d94b54ebfa4",
      type: "heading",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "This is a hedgdfading block",
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: "36ef5aa6-6742-4a4b-9e28-b9a4c33d452b",
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [
        {
          type: "text",
          text: "This is a paragraph block",
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: "d6a287a6-4228-4d1d-976a-e3d327a65f56",
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [],
      children: [],
    },
  ]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const blogData = await fetchBlog(params.id);
        setdata(blogData);
        const parsedContent = JSON.parse(blogData.content);
        setInitialContent(parsedContent);
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
  console.log(imageUrl, "");
  return (
    <div className="px-20 h-screen  flex flex-col items-center justify-start">
      <div className="w-full py-3  flex items-center justify-between border-b h-[66px] ">
        <Image
          onClick={() => router.push("/")}
          className="cursor-pointer"
          alt="logo"
          src="/quark.png"
          width={50}
          height={50}
        />
        <div className="flex items-center justify-center ">
          <Button asChild className="mr-6">
            <Link href="/home/create">Create Blog</Link>
          </Button>

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

      {!editor ? (
        <Loading />
      ) : (
        <div className="mt-8 flex flex-col items-start gap-3 justify-center">
          <div className="flex px-10 w-full mb-4 items-center justify-between  flex-row">
            <div className="flex   items-center justify-center ">
              <Avatar>
                <AvatarImage
                  className=" pointer rounded-full w-10"
                  src={imageUrl as string}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div
                className="flex flex-col text-gray-500 items-start ml-4 font-medium justify-center
            "
              >
                <h1>{data.owner.name}</h1>
                <h1>
                  Posted on{" "}
                  {data?.createdAt && formatDateToReadable(data.createdAt)} •
                  Edited on{" "}
                  {data?.updatedAt && formatDateToReadable(data.updatedAt)}
                </h1>
              </div>
            </div>
            <Button
              onClick={() => router.push(`/edit/${params.id}`)}
              className="cursor-pointer"
              variant={"outline"}
            >
              Contribute
            </Button>
          </div>
          <div className="px-10 w-full">
            <div className="h-[44px]  w-full flex items-center justify-between  border-t border-b">
              <div className="flex items-center cursor-pointer  w-fit  gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  fill="#6A7282"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-label="clap"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.37.828 12 3.282l.63-2.454zM13.916 3.953l1.523-2.112-1.184-.39zM8.589 1.84l1.522 2.112-.337-2.501zM18.523 18.92c-.86.86-1.75 1.246-2.62 1.33a6 6 0 0 0 .407-.372c2.388-2.389 2.86-4.951 1.399-7.623l-.912-1.603-.79-1.672c-.26-.56-.194-.98.203-1.288a.7.7 0 0 1 .546-.132c.283.046.546.231.728.5l2.363 4.157c.976 1.624 1.141 4.237-1.324 6.702m-10.999-.438L3.37 14.328a.828.828 0 0 1 .585-1.408.83.83 0 0 1 .585.242l2.158 2.157a.365.365 0 0 0 .516-.516l-2.157-2.158-1.449-1.449a.826.826 0 0 1 1.167-1.17l3.438 3.44a.363.363 0 0 0 .516 0 .364.364 0 0 0 0-.516L5.293 9.513l-.97-.97a.826.826 0 0 1 0-1.166.84.84 0 0 1 1.167 0l.97.968 3.437 3.436a.36.36 0 0 0 .517 0 .366.366 0 0 0 0-.516L6.977 7.83a.82.82 0 0 1-.241-.584.82.82 0 0 1 .824-.826c.219 0 .43.087.584.242l5.787 5.787a.366.366 0 0 0 .587-.415l-1.117-2.363c-.26-.56-.194-.98.204-1.289a.7.7 0 0 1 .546-.132c.283.046.545.232.727.501l2.193 3.86c1.302 2.38.883 4.59-1.277 6.75-1.156 1.156-2.602 1.627-4.19 1.367-1.418-.236-2.866-1.033-4.079-2.246M10.75 5.971l2.12 2.12c-.41.502-.465 1.17-.128 1.89l.22.465-3.523-3.523a.8.8 0 0 1-.097-.368c0-.22.086-.428.241-.584a.847.847 0 0 1 1.167 0m7.355 1.705c-.31-.461-.746-.758-1.23-.837a1.44 1.44 0 0 0-1.11.275c-.312.24-.505.543-.59.881a1.74 1.74 0 0 0-.906-.465 1.47 1.47 0 0 0-.82.106l-2.182-2.182a1.56 1.56 0 0 0-2.2 0 1.54 1.54 0 0 0-.396.701 1.56 1.56 0 0 0-2.21-.01 1.55 1.55 0 0 0-.416.753c-.624-.624-1.649-.624-2.237-.037a1.557 1.557 0 0 0 0 2.2c-.239.1-.501.238-.715.453a1.56 1.56 0 0 0 0 2.2l.516.515a1.556 1.556 0 0 0-.753 2.615L7.01 19c1.32 1.319 2.909 2.189 4.475 2.449q.482.08.971.08c.85 0 1.653-.198 2.393-.579.231.033.46.054.686.054 1.266 0 2.457-.52 3.505-1.567 2.763-2.763 2.552-5.734 1.439-7.586z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="font-light text-sm text-gray-500">101</p>
              </div>
              <div className="flex items-center justify-center gap-6">
                <AudioLines className="text-gray-500 w-5 cursor-pointer" />
                <Linkk
                  onClick={copyCurrentUrlToClipboard}
                  className="text-gray-500 w-5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <h1 className="text-6xl w-[800px]  w-max-[800px] ml-10 font-bold p-2">
            {data.title}
          </h1>
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
