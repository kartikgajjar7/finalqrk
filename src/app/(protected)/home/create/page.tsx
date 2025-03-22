"use client";
// YourPageOrComponent.tsx
import { useState, useRef } from "react";
import InitializedMDXEditor from "@/components/editor/InitializedMDXEditor";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
export default function EditorPage() {
  const editorRef = useRef<MDXEditorMethods>(null);
  return (
    <>
      <button onClick={() => editorRef.current?.setMarkdown("new markdown")}>
        Set new markdown
      </button>
      <button onClick={() => console.log(editorRef.current?.getMarkdown())}>
        Get markdown
      </button>
      <InitializedMDXEditor editorRef={editorRef} markdown="/# Hello world" />
    </>
  );
}
