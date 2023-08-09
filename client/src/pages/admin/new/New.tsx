import "./new.scss";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "@/components/admin/sidebar/Sidebar";
import Navbar from "@/components/admin/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

type Inputs = {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
};

interface INew {
  inputs: Inputs[];
  title: string;
}

const New: React.FC<INew> = ({ inputs, title }) => {
  const [file, setFile] = useState<File | Blob | null>(null);
  const [info, setInfo] = useState({});
  console.log(file, info, "has been receiveddd");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    console.log("clickHandler!");
    try {
      const data = new FormData();
      data.append("file", file as Blob);
      data.append("upload_preset", "upload");
      console.log("trying to post data on cloudinary");
      const uploadRes = await axios.post(
        "https://api/cloudinary.com/v1_1/amitxparmar/image/upload",
        data
      );
      const { url } = uploadRes.data;
      console.log(url, "typecheck", typeof url);

      const newUser = {
        ...info,
        img: url as string,
      };

      console.log(newUser, "ready to register!!");

      toast.success("new hotel created!!");
      await axios.post(`/api/auth/register/`, newUser);
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
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files?.[0]) setFile(e.target.files?.[0]);
                  }}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
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
              <button onClick={void handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
