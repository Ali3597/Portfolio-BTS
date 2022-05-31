import { useEffect, useState } from "react";
import { InputFile } from "../../components/inputFile";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
import identite from "../../assets/identite.jpg";
import { FaMailBulk } from "react-icons/fa";

export function Profile({ theme, user }) {
  const imageRef = ref(storage, "me/profile");
  const [profile, setProfile] = useState(null);

  useEffect(async () => {
    const urlProfile = await getDownloadURL(imageRef);
    setProfile(urlProfile);
  }, []);
  return (
    <>
      <div className="home-img">
        {profile && (
          <img
            src={profile ? profile : identite}
            alt="me"
            width="90%"
            height="90%"
          />
        )}
        {user && <InputFile link={"me/profile"} setFile={setProfile} />}
      </div>
      <h1 style={{ color: theme.basicColor }}>Ali Saleh</h1>
      <h3 style={{ color: theme.greyTitleColor }}>BTS SIO option SLAM</h3>
      <ul>
        <li>
          <a href="mailto:ali_saleh-4@hotmail.fr">
            <FaMailBulk size={40} color={"#795548"} />{" "}
          </a>
        </li>
        <li>
          <a href={"https://github.com/Ali3597"} target="_blank">
            <FaGithub size={40} color={"#795548"} />
          </a>
        </li>
        <li>
          <a
            href={"https://www.linkedin.com/in/ali-saleh-483076236/"}
            target="_blank"
          >
            <FaLinkedin size={40} color={"#795548"} />
          </a>
        </li>
      </ul>{" "}
    </>
  );
}
