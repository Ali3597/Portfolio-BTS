import { useEffect, useState } from "react";
import { InputFile } from "../../components/inputFile";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
import identite from "../../assets/identite.jpg";
import { FaMailBulk } from "react-icons/fa";

export function Profile({ theme }) {
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
        <InputFile link={"me/profile"} setFile={setProfile} />
      </div>
      <h1 style={{ color: theme.basicColor }}>Ali Saleh</h1>
      <h3 style={{ color: theme.greyTitleColor }}>BTS SIO option SLAM</h3>
      <ul>
        <li>
          <FaMailBulk size={40} color={"#795548"} />
        </li>
        <li>
          <FaGithub size={40} color={"#795548"} />
        </li>
        <li>
          <FaLinkedin size={40} color={"#795548"} />
        </li>
      </ul>{" "}
    </>
  );
}
