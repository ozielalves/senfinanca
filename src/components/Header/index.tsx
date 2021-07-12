import senfinancasLogo from "../../assets/images/senfinancasLogo.png";
import { CustomHeader } from "./styles";

function Header() {
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
