import useFetch from "@/hooks/useFetch";
import "./newRoom.scss";
import { ChangeEvent, useState } from "react";
import { IHotel } from "@/types";
import { SwipeDownAltRounded } from "@mui/icons-material";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import Navbar from "@/components/admin/navbar/Navbar";
import { roomInputs } from "@/formSource";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotel] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch<IHotel[]>(`/api/hotels`);
  console.log("fetched data, IHotel[] in new room", data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
