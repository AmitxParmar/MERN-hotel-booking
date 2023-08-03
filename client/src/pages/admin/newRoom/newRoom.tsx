import useFetch from "@/hooks/useFetch";
import "./newRoom.scss";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { IHotel } from "@/types";

import Sidebar from "@/components/admin/sidebar/Sidebar";
import Navbar from "@/components/admin/navbar/Navbar";
import { roomInputs } from "@/formSource";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState<string | undefined>(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch<IHotel[]>(`/api/hotels`);
  console.log("fetched data, IHotel[] in new room", data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  console.log("rooms check", rooms);
  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    const roomNumbers: string[] = rooms
      ?.split(",")
      .map((room) => ({ number: room }));

    alert(roomNumbers);
    try {
      if (typeof hotelId === "string") {
        await axios.post(`/api/rooms/${hotelId}`, { ...info, roomNumbers });
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
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
              <div className="formInput">
                <label htmlFor="">Rooms</label>
                <textarea placeholder="give comman between room numbers." />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data?.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
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

export default NewRoom;
