import "./Register.css";
function Register() {
  return (
    <>
      <div className="page">
        <div className="container">
          <div className="title">Create Account</div>
          <form action="">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="john.doe"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john@doe.com"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="password"
              required
            />

            <label htmlFor="password">Confirm password</label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="password"
              required
            />
          </form>
          <br />
          <a href="/register" className="link">
            Register
          </a>
        </div>
      </div>
    </>
  );
}

export default Register;
