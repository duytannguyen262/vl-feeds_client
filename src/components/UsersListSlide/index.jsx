import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import userImg from "../../assets/user.png";
import "./styles.scss";

const UsersListSlide = ({ users }) => {
  const slickSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 5,
  };

  const navigate = useNavigate();
  return (
    <div className="usersListSlide">
      <div className="usersListSlide-header">
        <h1>Những người dùng đã theo dõi</h1>
      </div>
      {users.length > 0 && (
        <div className="usersListSlide-sliderContainer">
          <Slider {...slickSettings}>
            {users.map((user, index) => (
              <div key={index} className="usersListSlide-item">
                <div
                  onClick={() => navigate(`/user/${user.id}`)}
                  className="usersListSlide-item-avatar"
                >
                  <img
                    src={user.avatar.url ? user.avatar.url : userImg}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default UsersListSlide;
