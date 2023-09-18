import logo from "../../../assets/Logo.png";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.container}>
        <div className={`{classes['left-sidebar']} ${classes["d-flex"]} ${classes["align-center"]}`}>
          <img src={logo} alt="" height="30px" width="30px" />
          <div className={`{classes['text-bold]} ${classes[`ml-2`]}`}>SIMS PPOB</div>
        </div>
        <div className={classes[`right-navbar`]}>
          <Link to="/topup">Top Up</Link>
          <a href="goto">Transaction</a>
          <Link to="/akun">Akun</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
