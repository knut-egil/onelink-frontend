import "./App.css";
import Profile from "./views/Profile";

function App() {
  return (
    <>
      <Profile
        links={[
          {
            id: "0",
            url: "https://instagram.com/knutegilvn",
            title: "// Instagram",
            icon: "instagram",
          },
          {
            id: "1",
            url: "https://github.com/knut-egil",
            title: "// GitHub",
            icon: "github",
          },
          {
            id: "2",
            url: "https://discordapp.com/users/203526947601383424",
            title: "// Discord",
            icon: "discord",
          },
          {
            id: "3",
            url: "javascript:alert(1)",
            title: "// Implement",
            icon: "#",
          },
        ]}
      />
    </>
  );
}

export default App;
