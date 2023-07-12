import "./home.css";
import Navbar from "@/components/navbar/Navbar.tsx";
import Header from "@/components/header/Header";
import Featured from "@/components/featured/Featured";
import PropertyList from "@/components/propertyList/PropertyList";
import FeaturedProperties from "@/components/featuredProperties/FeaturedProperties";
import MailList from "@/components/mailList/MailList";
import Footer from "@/components/footer/Footer";
import React from "react";

const Home = () => {
  React.useEffect(() => {
    const fetcher = async() => {
      await fetch("/api/hotels")
        .then((res) => res.json())
        .then((data) => console.log(data));
    };
    void fetcher();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
