import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchReceivedRequest = async () => {
    try {
      const requestData = await axios.get(
        BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        }
      );
      dispatch(addRequests(requestData.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReceivedRequest();
  }, []);

  const reviewRequest = async (status, _id) => {
    try {
        const res = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, {withCredentials: true})
        dispatch(removeRequest(_id))
    } catch (err) {
        console.log(err.message)
    }
  }

  if (!requests) return <h1> No Request Found </h1>;

  if (requests.length == 0) return <h2> No Request Found </h2>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-4xl">Request</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, about, profileUrl } =
          request.fromUserId;
        return (
          <div key={_id} className="flex justify-between items-center m-4 p-4 bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                alt="profile photo"
                src={profileUrl}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {" "}
                {firstName + " " + lastName}
              </h2>
              <p> {age + ", " + gender}</p>
              <p> {about}</p>
            </div>
            <div>
              <button 
                className="flex btn btn-primary my-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button 
                className="btn btn-secondary my-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
