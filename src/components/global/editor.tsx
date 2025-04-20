"use client";
import React from "react";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  Theme,
  darkDefaultTheme,
  lightDefaultTheme,
} from "@blocknote/mantine";
import BlueButton from "./bluebutton";
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from "@blocknote/react";
export default function Editor({
  blocks,
  editable,
  bg,
  setBlocks,
  editorinstance,
}) {
  const lightRedTheme = {
    colors: {
      editor: {
        text: "#222222",
        background: "#ffeeee",
      },
      menu: {
        text: "#ffffff",
        background: "#101010",
      },
      tooltip: {
        text: "#ffffff",
        background: "#101010",
      },
      hovered: {
        text: "#cacccf",
        background: "#000000",
      },
      selected: {
        text: "#ffffff",
        background: "#102010",
      },
      disabled: {
        text: "101010",
        background: "#7d0000",
      },
      shadow: "#000000",
      border: "#0b0b0d",
      sideMenu: "#bababa",
      highlights: lightDefaultTheme.colors!.highlights,
    },
    borderRadius: 4,
    fontFamily: "Helvetica Neue, sans-serif",
  } satisfies Theme;

  const darkRedTheme = {
    ...lightRedTheme,
    colors: {
      ...lightRedTheme.colors,
      editor: {
        text: "#ffffff",
        background: bg === "dark" ? "#0D0A09" : "#101010",
      },
      sideMenu: "#ffffff",
      highlights: darkDefaultTheme.colors!.highlights,
    },
  } satisfies Theme;
  const redTheme = {
    light: lightRedTheme,
    dark: darkRedTheme,
  };

  return (
    <div className="max-w-[800px] w-full">
      <BlockNoteView
        editable={editable}
        onChange={() => {
          setBlocks(editorinstance.document);
        }}
        theme={darkRedTheme}
        editor={editorinstance}
      />
    </div>
  );
}
