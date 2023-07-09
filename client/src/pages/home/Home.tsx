import Navbar from "@/components/navbar/Navbar.tsx";
import Header from "@/components/header/Header"
import "./home.css";
import Featured from "@/components/featured/Featured";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured/>
      </div>
    </div>
  );
};

export default Home;
