import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

type Props = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

function TagInput({ tags, setTags }: Props) {
  const [tagsInput, setTagsInput] = useState("");
  const [isTagRepeat, setIsTagRepeat] = useState(false);

  const addNewTag = () => {
    const input = tagsInput.trim();

    if (input.length > 0) {
      if (tags.includes(input)) {
        setIsTagRepeat(true);
        return;
      }

      setTags((prev) => [...prev, input]);
      setTagsInput("");
      setIsTagRepeat(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (index: number) => {
    const tagsCopy = [...tags];
    tagsCopy.splice(index, 1);
    setTags(tagsCopy);
  };

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap mt-2">
        {tags?.map((tag, index) => (
          <span className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded" key={index}>
            # {tag}
            <button onClick={() => handleRemoveTag(index)}>
              <MdClose />
            </button>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="group w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-blue-700 group-hover:text-white" />
        </button>
      </div>

      {isTagRepeat && (
        <p className="text-xs text-red-500 mt-1">This tag already exists.</p>
      )}
    </div>
  );
}

export default TagInput;
