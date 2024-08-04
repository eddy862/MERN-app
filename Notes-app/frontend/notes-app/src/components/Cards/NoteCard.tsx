import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

type Props = {
  title: string;
  date: string;
  descp: string;
  tags: string[];
  isPinned: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onPinNote: () => void;
};

function NoteCard({
  title,
  date,
  descp,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}: Props) {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <MdOutlinePushPin
          className={`${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">
        {descp?.slice(0, 60)}
        {descp?.length > 60 && "..."}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-500">
          {tags.map((tag) => (
            <span>{`#${tag}`}</span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600 cursor-pointer"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
