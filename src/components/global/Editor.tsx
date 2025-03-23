"use client";
import { EditorContent, EditorRoot } from "novel";
import { defaultExtensions } from "./extentions";
import { useState } from "react";
const Editor = () => {
  const [content, setContent] = useState("fwf");
  const extensions = [...defaultExtensions];
  return (
    <EditorRoot>
      <EditorContent
        extensions={extensions}
        initialContent={content}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
      />
    </EditorRoot>
  );
};

export default Editor;
