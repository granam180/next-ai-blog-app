import { FormattedPost } from "@/app/types";
import { Editor } from "@tiptap/react";
/**
 * Tiptap is a headless wrapper around ProseMirror – a toolkit for building 
 * rich text WYSIWYG editors, which is already in use at many well-known companies 
 * such as New York Times, The Guardian or Atlassian.
 */
import React from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

type Props = {
  isEditable: boolean;
  handleIsEditable: (isEditable: boolean) => void; // set dynamically
  title: string;
  setTitle: (title: string) => void; // set dynamically
  tempTitle: string;
  setTempTitle: (tempTitle: string) => void; // set dynamically
  tempContent: string;
  setTempContent: (tempContent: string) => void; // set dynamically
  editor: Editor | null;
  post: FormattedPost;
};

const CategoryAndEdit = ({
  isEditable,
  handleIsEditable,
  title,
  setTitle,
  tempTitle,
  setTempTitle,
  tempContent,
  setTempContent,
  editor,
  post,
}: Props) => {
  // Edit content
  const handleEnableEdit = () => {
    handleIsEditable(!isEditable);
    setTempTitle(title); // default
    setTempContent(editor?.getHTML() || ""); // default
  };

  // Cancel edit state
  const handleCancelEdit = () => {
    handleIsEditable(!isEditable);
    setTitle(tempTitle);
    editor?.commands.setContent(tempContent);
  };

  return (
    <div className="flex justify-between items-center">
      <h4 className="bg-accent-orange py-2 px-5 tex-wh-900 text-sm font-bold">
        {post.category}
      </h4>
      <div className="mt-4">
        {isEditable ? (
          <div className="flex justify-between gap-3">
            <button onClick={handleCancelEdit}>
              <XMarkIcon className="h-6 w-6 text-accent-red" />
            </button>
          </div>
        ) : (
          <button onClick={handleEnableEdit}>
            <PencilSquareIcon className="h-6 w-6 text-accent-red" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryAndEdit;
