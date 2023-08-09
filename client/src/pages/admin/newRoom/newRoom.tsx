import "./newRoom.scss";
import axios from "axios";
import { IHotel } from "@/types";
import useFetch from "@/hooks/useFetch";
import { ChangeEvent, SyntheticEvent, useState } from "react";

import Sidebar from "@/components/admin/sidebar/Sidebar";
import Navbar from "@/components/admin/navbar/Navbar";

import { roomInputs } from "@/formSource";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState<string | undefined>(undefined);
  const [rooms, setRooms] = useState("");

  const { data, loading,  } = useFetch<IHotel[]>(`/api/hotels`);
  console.log("fetched data, IHotel[] in new room", data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log("rooms check, useState", rooms);

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    console.log(typeof hotelId, "hotelId type check");
    try {
      if (typeof hotelId === "string") {
        const newrOOm = await axios.post(`/api/rooms/${hotelId}`, {
          ...info,
          roomNumbers,
        });
        console.log("post request done!");
        console.log("data receive from api", newrOOm);
      }
    } catch (err) {
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
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comman between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e?.target?.value)}
                  value={hotelId}
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
              <button onClick={(e: SyntheticEvent) => void handleClick(e)}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
