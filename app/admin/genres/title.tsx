import { TableCell } from "@/components/ui/table";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface TitleTableProps {
  initialTitle: string;
  genreId: string;
}

export const TitleTable = ({ initialTitle }: TitleTableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onClickOutside = () => {
    formRef.current?.requestSubmit();
    disableEditing();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }

    if (e.key === "Enter") {
      formRef.current?.requestSubmit();
      disableEditing();
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value === title) return;
    console.log(inputRef.current?.value);
    // TODO: Call API to update title genre

    setTitle(inputRef.current?.value!);
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(inputRef, onClickOutside);
  return (
    <TableCell className="p-0" onDoubleClick={enableEditing}>
      {isEditing ? (
        <form ref={formRef} onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent p-4"
            defaultValue={title}
          />
        </form>
      ) : (
        <span className="p-4">{title}</span>
      )}
    </TableCell>
  );
};
