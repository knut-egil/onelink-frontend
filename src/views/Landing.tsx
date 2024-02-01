import { Link } from "react-router-dom";
import "./Landing.css";
function Landing() {
  return (
    <>
      <div className="page">
        <div className="container">
          <h1>OneLink</h1>
          <p>
            Easily share all your social links, with one link!
            <br />
            ~~~
            <br />
            Get insights into how many visitors you get and who your visitors
            are.
            <br />
            ~~~
            <br />
            Figure out what generates the most traffic to your socials by
            quickly looking at your visitors graphs.
          </p>
          <br />
          <Link to={"/register"} className="link">
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
