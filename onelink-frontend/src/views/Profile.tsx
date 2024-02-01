import { useEffect, useState } from "react";
import "./Profile.css";

import InstagramLogo from "../assets/logos/instagram-mark-white.svg";
import GithubLogo from "../assets/logos/github-mark-white.svg";
import DiscordLogo from "../assets/logos/discord-mark-white.svg";

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

type LinkIcons = "instagram" | "github" | "discord" | string;
type SocialLink = {
  id: string;
  url: string;
  title: string;
  icon?: LinkIcons;
};

type ProfileProps = {
  links: SocialLink[];
};

function Profile(props: ProfileProps) {
  const IconMap: { [key in LinkIcons]: string } = {
    instagram: InstagramLogo,
    github: GithubLogo,
    discord: DiscordLogo,
  };

  const profileImageUrl = "https://picsum.photos/200";
  const [imgDataUri, setImgDataUri] = useState<string>();
  const [avgImgColor, setAvgImgColor] = useState<string>();
  async function get_average_rgb(src: string): Promise<Uint8ClampedArray> {
    /* https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript */
    return new Promise((resolve) => {
      const context = document.createElement("canvas").getContext("2d");
      context!.imageSmoothingEnabled = true;

      const img = new Image();
      img.src = src;
      img.crossOrigin = "";

      img.onload = () => {
        context!.drawImage(img, 0, 0, 1, 1);
        resolve(context!.getImageData(0, 0, 1, 1).data.slice(0, 3));
      };
    });
  }
  useEffect(() => {
    // TODO: Make this all pre-calculated on image upload to backend to prevent the visible loading in type stuff
    // Fetch image
    fetch(profileImageUrl).then(async (res) => {
      try {
        // Get blob
        const imgBlob = await res.blob();

        const reader = new FileReader();
        reader.readAsDataURL(imgBlob);
        reader.onloadend = async () => {
          // Get uri
          const b64Uri = reader.result as string;

          // set img data uri
          setImgDataUri(b64Uri);

          // Calculate avg color
          const avgColor = await get_average_rgb(b64Uri);
          console.log(avgColor);

          setAvgImgColor(
            `#${[...avgColor]
              .map((v) => v.toString(16).padStart(2, "0"))
              .join("")}`
          );
        };
      } catch (err) {
        console.error(err);
      }
    });
  }, [profileImageUrl]);

  function isSafeLink(value: string): boolean {
    if (typeof value !== "string") return false;

    // Check link format!
    const urlPattern =
      /^(http|https|mailto):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,6}(\S*)?$/gm;

    // Check link against pattern
    if (!urlPattern.exec(value)) return false;

    return true;
  }

  return (
    <>
      <div className="page" style={{ backgroundColor: avgImgColor }}>
        <div className="container">
          <Header
            profileImage={
              imgDataUri ??
              "data:image/png;base64,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"
            }
            title={"Knut Egil, 22yo"}
            bio={
              "Check out my other social channels by clicking the buttons below!"
            }
            extras={["Software Developer", "Norway"]}
          />
          <div className="link-container">
            {(props.links ?? []).map((link) => {
              return (
                // Ensure link is safe!
                <a
                  href={isSafeLink(link.url) ? link.url : "/"}
                  className="link"
                  link-id={link.id}
                >
                  <div className="icon">
                    {link.icon && IconMap[link.icon] ? (
                      <img src={IconMap[link.icon]} />
                    ) : (
                      <>{link.icon}</>
                    )}
                  </div>
                  <div className="link-title">
                    <span>{link.title}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
