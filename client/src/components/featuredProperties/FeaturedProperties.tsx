import useFetch from "@/hooks/useFetch";
import "./featuredProperties.css";
import { IHotel } from "@/types";

const FeaturedProperties = () => {
  const { data, loading } = useFetch<IHotel[]>("/api/hotels?featured=true&limit=4");
  return (
    <div className="fp">
      {loading ? (
        "Loading......"
      ) : (
        <>
          {data?.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.name}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
