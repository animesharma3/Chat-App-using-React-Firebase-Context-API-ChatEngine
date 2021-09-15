import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import auth from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };
  useEffect(() => {
    if (!user || user === null) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "8db72ed3-a113-49c6-af0c-523004d3a49f",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })

      .then(() => setLoading(false))

      .catch((e) => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "ef2089da-8647-4f0c-98eb-754a9af417c8",
              },
            })
            .then(() => setLoading(false))
            .catch((e) => console.log("e", e.response));
        });
      });
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  }, [user, history]);
  if (!user || loading) return <div />;
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="8db72ed3-a113-49c6-af0c-523004d3a49f"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
