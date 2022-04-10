export const chipColor = (value) => {
  switch (value) {
    case "Giảng viên":
      return "#00e676";
    case "Cơ sở vật chất":
      return "#FFA5A5";
    case "Sự kiện":
      return "#ff1744";
    case "Thư viện":
      return "#A97155";
    case "Đoàn thể":
      return "#01579b";
    case "Tài liệu":
      return "#83A7FC";
    case "Khác":
      return "#757575";
    default:
      return "primary";
  }
};
