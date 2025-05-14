import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, skills, profileUrl } =
    user;
  const dispatch = useDispatch();

  const checkConnection = async (status, _id) => {
    const res = await axios.post(
      `${BASE_URL}/request/send/${status}/${_id}`,
      {},
      { withCredentials: true }
    );
    dispatch(removeFeed(_id));
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={profileUrl} alt="Profile Photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <h6>{gender + ", " + " " + age}</h6>}
          {about && <p>{about}</p>}
          {/* {skills && skills.length > 0 && <p>{skills.join(", ")}</p>} */}
          <div className="card-actions justify-between">
            <button
              className="btn btn-primary"
              onClick={() => checkConnection("ignored", _id)}
              disabled={!_id}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => checkConnection("interested", _id)}
              disabled={!_id}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
