import "./hotel.css";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";

import MailList from "@/components/mailList/MailList";
import Footer from "@/components/footer/Footer";
import Reserve from "@/components/reserve/Reserve";

import { useAuth } from "@/common/auth.store";
import { useSearchStore } from "@/common/search.store";

import useFetch from "@/hooks/useFetch";
import { IHotel } from "@/types";

const Hotel = () => {
  const user = useAuth((store) => store.user);

  const { dates, options } = useSearchStore((store) => ({
    dates: store.dates,
    options: store.options,
  }));

  const [slideNumber, setSlideNumber] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];
  console.log(location.pathname, location, "location hook hotelpage");

  const { data, loading } = useFetch<IHotel>(`/api/hotels/find/${id}`);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1: Date, date2: Date) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

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
    else navigate("/login");
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading..."
      ) : (
        <div className="hotelContainer">
          {open && (
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
                  src={data?.photos[slideNumber]}
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
            <h1 className="hotelTitle">{data?.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data?.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location = {data?.distance} m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data?.cheapestPrice} at this property and get a
              free airport taxi.
            </span>
            <div className="hotelImages">
              {data?.photos?.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt="hotel image"
                  className="hotelImg"
                  onClick={() => handleOpen(i)}
                />
              ))}
            </div>
            <div className="hoteDetails">
              <div className="hoteDetailsTexts">
                <h1 className="hotelTitle">{data?.title}</h1>
                <p className="hotelDesc">{data?.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>
                    $
                    {days *
                      Number(data?.cheapestPrice) *
                      Number(options?.room) ?? 0}
                  </b>
                  ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
