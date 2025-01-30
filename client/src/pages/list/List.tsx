import "./list.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import format from "date-fns/format";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/header/Header";
import SearchItem from "@/components/searchItem/SearchItem";
import useFetch from "@/hooks/useFetch";
import { IHotel, ILocationState, Options } from "@/types";

const List = () => {
  const location = useLocation();
  const state = location.state as ILocationState | null;

  const [destination, setDestination] = useState<string>(
    state?.destination ?? ""
  );
  const [dates, setDates] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState<Options>({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");

  const {
    data: hotels,
    loading,
    reFetch,
  } = useFetch<IHotel[]>(
    `/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    void reFetch();
  };

  const handleDateChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection) {
      setDates([selection]);
    }
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
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(
                  dates[0].startDate || new Date(),
                  "MM/dd/yyyy"
                )} to ${format(dates[0].endDate || new Date(), "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={handleDateChange}
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
                    onChange={(e) =>
                      setOptions({ ...options, adult: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={String(options.children)}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        children: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={String(options.room)}
                    onChange={(e) =>
                      setOptions({ ...options, room: Number(e.target.value) })
                    }
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
