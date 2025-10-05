import React from "react";
import type { OutputData } from "@editorjs/editorjs";
import type { JSX } from "react";

interface NoteRendererProps {
  data: OutputData;
}

const NoteRenderer: React.FC<NoteRendererProps> = ({ data }) => {
  const headings: Record<number, keyof JSX.IntrinsicElements> = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  };
  return (
    <div className="prose max-w-none">
      {data.blocks.map((block) => {
        switch (block.type) {
          case "header": {
            const { text, level } = block.data as {
              text: string;
              level: number;
            };
            const HeadingTag = headings[level] || "h2"; // fallback

            return <HeadingTag key={block.id}>{text}</HeadingTag>;
          }

          case "paragraph": {
            const { text } = block.data as { text: string };
            return (
              <p key={block.id} dangerouslySetInnerHTML={{ __html: text }} />
            );
          }

          case "list": {
            const { style, items } = block.data as {
              style: "ordered" | "unordered";
              items: string[];
            };
            if (style === "ordered") {
              return (
                <ol key={block.id}>
                  {items.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ol>
              );
            }
            return (
              <ul key={block.id}>
                {items.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            );
          }

          case "inlineCode": {
            const { text } = block.data as { text: string };
            return (
              <code key={block.id} className="bg-gray-100 px-1 rounded">
                {text}
              </code>
            );
          }

          case "code": {
            const { code } = block.data as { code: string };
            return (
              <pre
                key={block.id}
                className="bg-gray-900 text-white p-3 rounded-md overflow-x-auto"
              >
                <code>{code}</code>
              </pre>
            );
          }

          case "embed": {
            const { service, source, embed, caption } = block.data as {
              service: string;
              source: string;
              embed: string;
              caption: string;
            };
            return (
              <div key={block.id} className="my-4">
                <iframe
                  src={embed}
                  title={caption || service}
                  className="w-full aspect-video rounded"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                {caption && <p className="text-sm text-gray-500">{caption}</p>}
              </div>
            );
          }

          case "image": {
            const { file, caption } = block.data as {
              file: { url: string };
              caption: string;
            };
            return (
              <figure key={block.id} className="my-4">
                <img
                  src={file.url}
                  alt={caption}
                  className="rounded-md max-w-full"
                />
                {caption && (
                  <figcaption className="text-sm text-gray-500">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case "linkTool": {
            const { link, meta } = block.data as {
              link: string;
              meta?: {
                title?: string;
                description?: string;
                image?: { url: string };
              };
            };
            return (
              <a
                key={block.id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block border rounded-md p-3 hover:bg-gray-50"
              >
                {meta?.image?.url && (
                  <img
                    src={meta.image.url}
                    alt={meta.title || "Link preview"}
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-semibold">{meta?.title || link}</p>
                  <p className="text-sm text-gray-500">{meta?.description}</p>
                </div>
              </a>
            );
          }

          case "table": {
            const { content } = block.data as { content: string[][] };
            return (
              <table
                key={block.id}
                className="table-auto border-collapse border border-gray-400"
              >
                <tbody>
                  {content.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-400 px-2 py-1"
                          dangerouslySetInnerHTML={{ __html: cell }}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          }

          case "quote": {
            const { text, caption } = block.data as {
              text: string;
              caption: string;
            };
            return (
              <blockquote
                key={block.id}
                className="border-l-4 border-gray-400 pl-4 italic my-4"
              >
                <p dangerouslySetInnerHTML={{ __html: text }} />
                {caption && <cite className="block text-sm">— {caption}</cite>}
              </blockquote>
            );
          }

          case "marker": {
            const { text } = block.data as { text: string };
            return (
              <mark key={block.id} className="bg-yellow-200">
                {text}
              </mark>
            );
          }

          default:
            return (
              <p key={block.id} className="text-red-500">
                Unsupported block type: {block.type}
              </p>
            );
        }
      })}
    </div>
  );
};

export default NoteRenderer;
