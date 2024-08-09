import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import {
  type Note,
  type AllNotesResp,
  type User,
  type UserResponse,
  deleteNoteResp,
  CreateNoteResp,
} from "../../types/apiTypes";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNoteSvg from "../../assets/add-notes.svg";
import ConfirmDelete from "./ConfirmDelete";
import Profile from "../Profile/Profile";

Modal.setAppElement("#root");

type Props = {};

type ModalType = {
  visible: boolean;
  type?: "add" | "edit";
  data?: Note;
};

export type ToastType = {
  visible: boolean;
  type?: "edit" | "delete" | "add";
  msg?: string;
};

const Home = (props: Props) => {
  const [openAddEditModal, setOpenAddEditModal] = useState<ModalType>({
    visible: false,
  });
  const [openDeleteModal, setOpenDeleteModal] = useState<ModalType>({
    visible: false,
  });
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilterNotes] = useState<Note[]>([]);

  const [showToastMsg, setShowToastMsg] = useState<ToastType>({
    visible: false,
  });

  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    console.log(query);
    const targetQuery = query.trim().toLowerCase();

    if (targetQuery === "") {
      setFilterNotes(allNotes);
    } else {
      const filtered = allNotes.filter((note) => {
        const title = note.title.toLowerCase();
        const desp = note.description.toLowerCase();

        return title.includes(targetQuery) || desp.includes(targetQuery);
      });

      setFilterNotes(filtered);
    }
  };

  const handleEditNote = useCallback((noteData: Note) => {
    setOpenAddEditModal({ visible: true, type: "edit", data: noteData });
  }, []);

  const showToastMessage = useCallback(
    (msg: string, type: "edit" | "delete" | "add") => {
      setShowToastMsg({
        visible: true,
        type: type,
        msg: msg,
      });
    },
    []
  );

  const getUserInfo = async () => {
    try {
      const { data }: { data: UserResponse } = await axiosInstance.get("/user");

      if (data && data.user) {
        setUserInfo(data.user);
      }
    } catch (err) {
      //token not found or unauthorized user
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.msg) {
          if (err.response.status === 401) {
            localStorage.clear();
            navigate("/login");
          } else {
            console.error(err.response.data.msg);
          }
        }
      } else {
        console.error(
          "An enexpected error occured when getting user info. Please try again."
        );
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const { data }: { data: AllNotesResp } = await axiosInstance.get(
        "/notes"
      );

      if (data && data.notes) {
        setAllNotes(data.notes);
        setFilterNotes(data.notes);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.msg) {
          console.error(
            `Error getting all notes: ${err.response.data.msg}. Please try again`
          );
        }
      } else {
        console.error(
          "An enexpected error occured when getting all notes. Please try again."
        );
      }
    } finally {
      setSearchQuery("");
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const { data }: { data: deleteNoteResp } = await axiosInstance.delete(
        `notes/${noteId}`
      );

      if (data && data.note) {
        getAllNotes();
        showToastMessage("Note Deleted Successfully", "delete");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.msg) {
          console.error(err.response.data.msg);
        }
      } else {
        console.error(
          "An unexpected error occured when deleting note. Please try again"
        );
      }
    }
  };

  const updateIsPinned = async (noteId: string, isPinnedValue: boolean) => {
    try {
      const { data }: { data: CreateNoteResp } = await axiosInstance.patch(
        `notes/${noteId}`,
        { isPinned: { value: isPinnedValue } }
      );

      if (data && data.note) {
        getAllNotes();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.msg) {
          console.error(err.response.data.msg);
        }
      } else {
        console.error("An unexpected error occured. Please try again");
      }
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <div className="h-full">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userInfo={userInfo}
        handleSearch={handleSearch}
        setOpenProfile={() => setOpenProfileModal(true)}
      />

      <div className="container mx-auto">
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                descp={note.description}
                date={moment(note.createdAt).format("Do MMM YYYY")}
                tags={note.tags}
                isPinned={note.isPinned}
                onDelete={() =>
                  setOpenDeleteModal({ data: note, visible: true })
                }
                onEdit={() => handleEditNote(note)}
                onPinNote={() => updateIsPinned(note._id, !note.isPinned)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={AddNoteSvg}
            message="Start creating your first note! Click the '+' button to record write down your thoughts, ideas and reminders. Let's get started!"
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed md:left-[88%] md:bottom-10 bottom-5 left-[84%]"
        onClick={() => {
          setOpenAddEditModal({
            type: "add",
            visible: true,
          });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.visible}
        onRequestClose={() => {
          setOpenAddEditModal((prev) => ({ ...prev, visible: false }));
        }}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5"
      >
        <AddEditNote
          onCloseModal={() => setOpenAddEditModal({ visible: false })}
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
          showToastMsg={showToastMessage}
        />
      </Modal>

      <Modal
        isOpen={openDeleteModal.visible}
        onRequestClose={() =>
          setOpenDeleteModal((prev) => ({ ...prev, visible: false }))
        }
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5"
      >
        <ConfirmDelete
          noteData={openDeleteModal.data}
          onCloseModal={() => setOpenDeleteModal({ visible: false })}
          onDeleteNote={deleteNote}
        />
      </Modal>

      <Modal
        isOpen={openProfileModal}
        onRequestClose={() => setOpenProfileModal(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5"
      >
        <Profile
          userData={userInfo}
          onCloseModal={() => setOpenProfileModal(false)}
          setUserInfo={setUserInfo}
        />
      </Modal>

      <Toast
        toastDetails={showToastMsg}
        onClose={() => setShowToastMsg((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
};

export default Home;
