export const roleProp = (role) => {
  switch (role) {
    case "admin":
      return "Admin";
    case "teacher":
      return "Giảng viên";
    case "student":
      return "Sinh viên";
    case "banned":
      return "Đã bị khóa";
    default:
      return null;
  }
};
export const roleColor = (role) => {
  switch (role) {
    case "admin":
      return "#525E75";
    case "teacher":
      return "#C490E4";
    case "student":
      return "#0e86d4";
    case "banned":
      return "#ff4546";
    default:
      return null;
  }
};
