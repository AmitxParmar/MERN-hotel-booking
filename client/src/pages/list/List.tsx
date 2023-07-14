import "./list.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import format from "date-fns/format";
import { DateRange } from "react-date-range";

import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/header/Header";
import SearchItem from "@/components/searchItem/SearchItem";

import useFetch from "@/hooks/useFetch";

import { IHotel, ILocationState } from "@/types";

const List = () => {
  const location = useLocation();
  const {
    dates: datesParams,
    destination: destinationParams,
    options: optionsParams,
  } = location?.state as ILocationState;

  const [destination, setDestination] = useState(destinationParams);
  const [dates, setDates] = useState(datesParams);
  const [options, setOptions] = useState(optionsParams);
  
  const [openDate, setOpenDate] = useState(false);
  
  const [min, setMin] = useState<string | undefined>(undefined);
  const [max, setMax] = useState<string | undefined>(undefined);

  const {
    data: hotels,
    loading,
    reFetch,
  } = useFetch<IHotel[]>(
    `/api/hotels?city=${destination}&min=${min ?? 0}&max=${max ?? 999}`
  );

  /* functions */
  const handleClick = () => {
    void reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
                )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item?.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={String(options.adult)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={String(options.children)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={String(options.room)}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading
              ? "loading"
              : hotels?.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
