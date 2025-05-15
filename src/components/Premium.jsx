import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    const { keyId, amount, currency, notes, orderId } = order.data;

    // Open Razorpay Checkout
    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder", // Name of the application, this will be visible on dialog box
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser(),
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <div className="m-10">
      <div className="card bg-base-300 rounded-box grid h-96 grow place-items-center -z-1">
        <h1 className="font-bold text-4xl">Congrats, You are already a Premium member</h1>
        <h1 className="font-bold text-2xl">You are eligible to use these features</h1>
        <ul className="text-xl">
          <li> - Chat with other people</li>
          <li> - Send 100 friend request per day</li>
          <li> - Blue Tick </li>
          <li> - 3 months </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="m-10">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-base-300 rounded-box grid h-96 grow place-items-center">
          <h1 className="font-bold text-4xl">Silver Membership</h1>
          <ul className="text-xl">
            <li> - Chat with other people</li>
            <li> - Send 100 friend request per day</li>
            <li> - Blue Tick </li>
            <li> - 3 months </li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary text-xl"
          >
            {" "}
            Buy Silver{" "}
          </button>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-96 grow place-items-center">
          <h1 className="font-bold text-4xl">Gold Membership</h1>
          <ul className="text-xl">
            <li> - Chat with other people</li>
            <li> - Send Unlimited friend request</li>
            <li> - Blue Tick </li>
            <li> - 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary text-xl"
          >
            {" "}
            Buy Gold{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
