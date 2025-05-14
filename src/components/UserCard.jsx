const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, skills, profileUrl } = user;
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
