import bookMarkIcon from "../../assets/icons/bookmark.svg";
import homeIcon from "../../assets/icons/home.svg";
import starIcon from "../../assets/icons/star.svg";
import usersIcon from "../../assets/icons/users.svg";

export const data = [
  {
    id: "1",
    title: "Trang chủ",
    imgSrc: homeIcon,
    link: "/",
  },
  {
    id: "2",
    title: "Đang theo dõi",
    imgSrc: bookMarkIcon,
    link: "/following",
  },
  {
    id: "3",
    title: "Cần được trả lời",
    imgSrc: starIcon,
    link: "/eligible-posts",
  },
];
export const privateData = [
  {
    id: "4",
    title: "Quản lý người dùng",
    imgSrc: usersIcon,
    link: "/users",
  },
];
