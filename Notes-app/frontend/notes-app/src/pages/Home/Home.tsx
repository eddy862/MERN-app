import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { type User, type UserResponse } from "../../types/apiTypes";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

type Props = {};

const Home = (props: Props) => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    visible: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const { data }: { data: UserResponse } = await axiosInstance.get("/user");

      if (data && data.user) {
        setUserInfo(data.user);
      }
    } catch (err) {
      //token not found or unauthorized user
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Go to gym"
            descp="Go to gym on 3rd Aug 2024"
            date="3rd Aug 2024"
            tags={["exercise", "siuu"]}
            isPinned={true}
            onDelete={() => {}}
            onEdit={() => {}}
            onPinNote={() => {}}
          />

          <NoteCard
            title="Go to gym"
            descp="Go to gym on 3rd Aug 2024"
            date="3rd Aug 2024"
            tags={["exercise", "siuu"]}
            isPinned={true}
            onDelete={() => {}}
            onEdit={() => {}}
            onPinNote={() => {}}
          />

          <NoteCard
            title="Go to gym"
            descp="Go to gym on 3rd Aug 2024"
            date="3rd Aug 2024"
            tags={["exercise", "siuu"]}
            isPinned={true}
            onDelete={() => {}}
            onEdit={() => {}}
            onPinNote={() => {}}
          />

          <NoteCard
            title="Go to gym"
            descp="Go to gym on 3rd Aug 2024"
            date="3rd Aug 2024"
            tags={["exercise", "siuu"]}
            isPinned={true}
            onDelete={() => {}}
            onEdit={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal((prev) => ({
            ...prev,
            type: "add",
            visible: true,
          }));
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
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5"
      >
        <AddEditNote
          onCloseModal={() =>
            setOpenAddEditModal((prev) => ({ ...prev, visible: false }))
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
        />
      </Modal>
    </>
  );
};

export default Home;
