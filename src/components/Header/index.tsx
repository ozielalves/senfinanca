import { useEffect } from "react";
import senfinancasLogo from "../../assets/images/senfinancasLogo.png";
import { CustomHeader } from "./styles";


function Header() {
  /* useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        document.getElementById("navbar").style.padding = "30px 10px";
        document.getElementById("logo").style.fontSize = "25px";
      } else {
        document.getElementById("navbar").style.padding = "80px 10px";
        document.getElementById("logo").style.fontSize = "35px";
      }
    }
    return () => {
      cleanup;
    };
  }, []); */
  return (
    <CustomHeader>
      <div className="box">
        <img src={senfinancasLogo} alt="fireSpot" />
        <p className="logo">senfinanças</p>
      </div>
    </CustomHeader>
  );
}

export default Header;
