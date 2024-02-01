import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import AppConfig from "../Config";
import UserContext from "../contexts/UserContext";
import UserDto from "../models/UserDto";
import "./Login.css";

type LoginProps = {
  onLoggedIn?(user: UserDto): void;
};
function Login(props: LoginProps) {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [statusText, setStatusText] = useState<string>();
  const [statusState, setStatusState] = useState<"success" | "failure">(
    "failure"
  );

  async function onSubmit(event: React.FormEvent) {
    // Prevent any accidental auto-form submissions!
    event.preventDefault();

    // Custom submission logic
    const payload = {
      email: email,
      password: password,
    };

    try {
      // Make login requests
      // TODO: Create some easy-to-update endpoint file
      const res = await fetch(AppConfig.endpoints.api.login, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check ok status
      if (!res.ok) throw new Error("Non-ok status!");

      // Get response data
      const data: UserDto = await res.json();

      // Set status text & state
      setStatusState("success");
      setStatusText("Login successful!");

      setTimeout(() => {
        // Handle success :)
        if (props.onLoggedIn) props.onLoggedIn(data);
      }, 100 * 5);
    } catch (err) {
      // Failed login
      const { stack, message } = err as Error;
      console.error(`Account creation failed, error: ${stack ?? message}`);

      // Tell the user it failed!
      // Set status text & state
      setStatusState("failure");
      setStatusText("Login failed.");

      // Todo, use response error message as message.
    }
  }

  const { user } = useContext(UserContext);

  return (
    <>
      {
        // Redirect to front-page if signed in
        user && <Navigate to={"/"} />
      }
      <div className="page">
        <div className="container">
          <div className="title">Log in</div>
          <form onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john@doe.com"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              required
            />
            <br />
            {statusText ? (
              <span className={`status${statusState ? ` ${statusState}` : ""}`}>
                {statusText}
              </span>
            ) : (
              <></>
            )}
            <button type="submit" className="link">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
