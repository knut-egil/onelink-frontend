import "./Profile.css";

function Header(props: {
  profileImage: string;
  title: string;
  bio: string;
  extras: string[];
}) {
  return (
    <>
      <div className="header">
        <div className="picture">
          <img src={props.profileImage}></img>
        </div>
        <div className="about">
          <span className="title">{props.title}</span>
          <span className="bio">{props.bio}</span>
          <div className="extra">
            <span>{props.extras.join(" - ")}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function Profile() {
  return (
    <>
      <div className="container">
        <Header
          profileImage={"https://picsum.photos/200"}
          title={"Knut Egil, 22yo"}
          bio={
            "Check out my other social channels by clicking the buttons below!"
          }
          extras={["Software Developer", "Norway"]}
        />
        // Implement
        <div className="link-container"></div>
      </div>
    </>
  );
}

export default Profile;
