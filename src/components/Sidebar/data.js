import bookMarkIcon from "../../assets/icons/bookmark.svg";
import homeIcon from "../../assets/icons/home.svg";
import starIcon from "../../assets/icons/star.svg";
import usersIcon from "../../assets/icons/users.svg";
import followingIcon from "../../assets/icons/following.svg";

export const data = [
  {
    id: "1",
    title: "Trang chủ",
    imgSrc: homeIcon,
    link: "/",
  },
  {
    id: "2",
    title: "Bài viết đã lưu",
    imgSrc: bookMarkIcon,
    link: "/saved-posts",
  },
  {
    id: "3",
    title: "Cần được trả lời",
    imgSrc: starIcon,
    link: "/eligible-posts",
  },
  {
    id: "4",
    title: "Đã theo dõi",
    imgSrc: followingIcon,
    link: "/followed-users",
  },
];

export const privateData = [
  {
    id: "5",
    title: "Quản lý người dùng",
    imgSrc: usersIcon,
    link: "/users",
  },
];
