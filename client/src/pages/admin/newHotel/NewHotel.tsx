import "./newHotel.scss";
import { ChangeEvent, SyntheticEvent, useState } from "react";

import Sidebar from "@/components/admin/sidebar/Sidebar";
import Navbar from "@/components/admin/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import useFetch from "@/hooks/useFetch";
import { IRoom } from "@/types";
import { hotelInputs } from "@/formSource";

const NewHotel = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState<string[]>([]);

  const { data, loading } = useFetch<IRoom[]>("/api/rooms");

  // handle the info change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // handle the selected items
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  console.log("files typecheck", typeof files, files);

  // submit buttom
  const handleClick = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    try {
      const list = await Promise.all<string>(
        Object.values(files as FileList).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api/cloudinary.com/v1_1/amitxparmar/image/upload",
            data
          );
          const { url } = uploadRes.data;
          console.log(url, "typecheck", typeof url);
          return url as string;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };
      toast.success("new hotel created!!");
      await axios.post("/api/hotels", newhotel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <ToastContainer />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFiles(e.target.files)
                  }
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={"false"}>No</option>
                  <option value={"true"}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={void handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
