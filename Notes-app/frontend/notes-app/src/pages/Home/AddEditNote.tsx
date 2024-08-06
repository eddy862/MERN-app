import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

type Props = {
  onCloseModal: () => void;
  type: string;
  noteData: null;
};

function AddEditNote({ onCloseModal, noteData, type }: Props) {
  const [title, setTitle] = useState("");
  const [desp, setDesp] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [error, setError] = useState("");

  const addNewNote = async () => {};

  const editNote = async () => {};

  const handleAddNote = () => {
    if (title.trim().length === 0) {
      setError("Please enter title.");
      return;
    }

    if (desp.trim().length === 0) {
      setError("Please enter description.");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    }

    if (type === "add") {
      addNewNote();
    }

    onCloseModal();
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onCloseModal}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-xl text-slate-950 outline-none"
          placeholder="e.g. Go to gym"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">DESCRIPTION</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="e.g. lifting weight 4x10kg"
          rows={10}
          value={desp}
          onChange={(e) => setDesp(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
}

export default AddEditNote;
