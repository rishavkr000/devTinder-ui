import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connection = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connection Found </h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-4xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, profileUrl } =
          connection;
        return (
          <div
            key={_id}
            className="flex items-center justify-between m-4 p-4 bg-base-300 w-1/2 mx-auto rounded-md"
          >
            <img
              alt="profile photo"
              src={profileUrl}
              className="w-20 h-20 rounded-full"
            />
            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-xl">
                {" "}
                {firstName + " " + lastName}
              </h2>
              <p> {age + ", " + gender}</p>
              <p> {about}</p>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary ml-auto">
                Chat
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
