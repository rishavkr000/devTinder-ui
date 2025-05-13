import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [profileUrl, setProfileUrl] = useState(user.profileUrl);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    setError("");
    try {
      const dataToBeUpdate = {
        firstName,
        lastName,
        age,
        gender,
        about,
        profileUrl,
      };

      const saveProfileData = await axios.patch(
        BASE_URL + "/profile/edit",
        dataToBeUpdate,
        { withCredentials: true }
      );
      dispatch(addUser(saveProfileData.data.data));
      setToast(true);
      setToastMessage(saveProfileData.data.message);
      setTimeout(() => {
        setToast(false);
        setToastMessage("")
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center mx-10 my-10">
        <div className="card card-border bg-base-300 w-80">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                value={age}
                className="input"
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled value="">
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea h-20"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo Url</legend>
              <input
                type="text"
                value={profileUrl}
                className="input"
                onChange={(e) => setProfileUrl(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-3">
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        {toastMessage && <Toast message={toastMessage} />}
      </div>
      <UserCard
        user={{ firstName, lastName, age, gender, about, profileUrl }}
      />
    </div>
  );
};

export default EditProfile;
