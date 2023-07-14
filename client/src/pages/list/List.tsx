import "./list.css";
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import useFetch from "@/hooks/useFetch";
import SearchItem from "@/components/searchItem/SearchItem";

const List = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,"MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
