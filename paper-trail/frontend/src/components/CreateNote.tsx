import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";
import { motion } from "framer-motion";

// Import Editor.js tools
import Header from "@editorjs/header";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import CodeTool from "@editorjs/code";
import Embed from "@editorjs/embed";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";

const CreateNote: React.FC = () => {
  const editorRef = useRef<EditorJS | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    const initEditor = async () => {
      if (editorRef.current) return;

      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        minHeight: 200,
        tools: {
          header: {
            class: Header as any,
            inlineToolbar: true,
            config: { placeholder: "Title" },
          },
          paragraph: {
            inlineToolbar: true,
            config: { placeholder: "Write your note..." },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: { placeholder: "Add a list..." },
          },
          inlineCode: InlineCode,
          code: CodeTool,
          embed: Embed,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "/uploadFile",
                byUrl: "/fetchUrl",
              },
            },
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/fetchUrl",
            },
          },
          table: Table,
          quote: Quote,
          marker: Marker,
        },
        onReady: () => {
          editorRef.current = editor;
          isInitialized.current = true;
        },
        onChange: async () => {
          if (!editorRef.current) return;
          const data: OutputData = await editorRef.current.save();
          console.log("Editor Data:", data);
        },
      });
    };

    initEditor();

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, x: 100, y: 100 }} // start from bottom-right
        animate={{ opacity: 1, x: 0, y: 0 }} // move into position
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10,
          delay: 0.3,
        }}
        className="bg-white rounded-lg shadow-md flex flex-col h-full max-h-[calc(100vh-8rem)] overflow-hidden"
      >
        {/* Header section */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Create a New Note
          </h2>
        </div>

        {/* Editor container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div
            id="editorjs"
            className="editorjs-container border border-gray-300 rounded-md p-3 sm:p-4 min-h-[400px] max-w-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CreateNote;
