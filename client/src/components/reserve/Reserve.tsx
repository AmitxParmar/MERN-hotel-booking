import "./reserve.css";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "@/hooks/useFetch";
import { useSearchStore } from "@/common/search.store";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRoom } from "@/types";
import axios from "axios";

const Reserve = ({
  setOpen,
  hotelId,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  hotelId: string;
}) => {
  const dates = useSearchStore((store) => store.dates);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  const { data: rooms } = useFetch<IRoom[]>(`/api/hotels/room/${hotelId}`);

  const navigate = useNavigate();

  const getDatesInRange = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  const isAvailable = (roomNumber: {
    number: number;
    unavailableDates: Date[];
  }) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item: string) => item !== value)
    );
  };
  const handleClick = async (): Promise<void> => {
    try {
      console.log("....checkin room availability");
      await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.put(`/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {rooms?.map((room) => (
          <div className="rItem" key={room._id}>
            <div className="rItemInfo">
              <div className="rTitle">{room.title}</div>
              <div className="rDesc">{room.desc}</div>
              <div className="rMax">
                Max people: <b>{room.maxPeople}</b>
              </div>
              <div className="rPrice">{room.price}</div>
            </div>
            <div className="rSelectRooms">
              {room.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber?._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="rButton" onClick={() => void handleClick()}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
