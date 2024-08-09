import React from "react";
import { Note } from "../../types/apiTypes";
import { MdClose } from "react-icons/md";

type Props = {
  noteData?: Note;
  onCloseModal: () => void;
  onDeleteNote: (noteId: string) => Promise<void>;
};

const ConfirmDelete = ({ noteData, onCloseModal, onDeleteNote }: Props) => {
  const handleDeleteNote = () => {
    if (noteData) {
      onDeleteNote(noteData._id);
      onCloseModal();
    }
  };

  if (noteData === undefined) {
    return <p>Something wrong. Please try again</p>;
  }

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onCloseModal}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <p className="mr-10">
        Do you sure you want to delete the note with title
        <span className="font-bold"> "{noteData.title}"</span>?
      </p>

      <div className="flex gap-3 justify-end mt-5 text-sm">
        <button
          className="bg-red-500 p-2 rounded text-white"
          onClick={handleDeleteNote}
        >
          Delete
        </button>
        <button
          className="bg-slate-200 p-2 rounded text-slate-900"
          onClick={onCloseModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
