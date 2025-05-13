import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try {
      const feedData = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(feedData.data)
      dispatch(addFeed(feedData?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return feed && (
    <div>
      <UserCard user={feed[0]}/>
    </div>
  );
};

export default Feed;
