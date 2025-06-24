import React from "react";
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import Banner from "../../Components/Banner/Banner.jsx";
import Rowlist from "../../Components/Rows/RowList/Rowlist.jsx";
const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Rowlist />
      <Footer />
    </div>
  );
};

export default Home;
