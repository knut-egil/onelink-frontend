import { useState } from "react";
import AppConfig from "../Config";
import UserDto from "../models/UserDto";
import "./Register.css";

type RegisterProps = {
  onRegistered(user: UserDto): void;
};
function Register(props: RegisterProps) {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPasword] = useState<string>();

  const [statusText, setStatusText] = useState<string>("An error occured!");
  const [statusState, setStatusState] = useState<"success" | "failure">(
    "failure"
  );

  async function onSubmit(event: React.FormEvent) {
    // Prevent any accidental auto-form submissions!
    event.preventDefault();

    // Custom submission logic
    const payload = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      // Make register requests
      // TODO: Create some easy-to-update endpoint file
      const res = await fetch(AppConfig.endpoints.api.register, {
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

      // Handle success :)
      props?.onRegistered(data);
    } catch (err) {
      // Failed register
      const { stack, message } = err as Error;
      console.error(`Account creation failed, error: ${stack ?? message}`);

      // Tell the user it failed!
    }
  }

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="title">Create Account</div>
          <form onSubmit={onSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="john.doe"
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
              required
            />

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

            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="password"
              onChange={(e) => {
                setConfirmPasword(e.currentTarget.value);
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
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
