import "./hotel.css";
import { useState } from "react";
import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { useAuth } from "@/common/auth.store";
import { IHotel } from "@/types";

const Hotel = () => {
  const user = useAuth((store) => store.user);
  const [slideNumber, setSlideNumber] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];
  console.log(location.pathname, location, "location hook hotelpage");

  const { data, loading, error } = useFetch<IHotel>(`/hotels/find/${id}`);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  
  function dayDifference(date1: Date, date2: Date) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i: number) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction: "l" | "r") => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };
  const handleClick = () => {
    if (user) setOpenModal(true);
    navigate("/login");
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {false ? (
        "Loading..."
      ) : (
        <div className="hotelContainer">
          {true && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location = {data.distance} m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;
