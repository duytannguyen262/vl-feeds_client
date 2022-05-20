import { useMutation } from "@apollo/client";
import { Button, styled } from "@mui/material";
import { Card, Loading } from "@nextui-org/react";
import gql from "graphql-tag";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import logo from "../../assets/logo.png";
import "./styles.scss";

const ConfirmButton = styled(Button)({
  backgroundColor: "#f31260",
  boxShadow: "0 4px 14px 0 #f881ab",
  transition: "all 0.3s linear",

  borderRadius: "12px",
  border: "none",
  width: "100%",
  padding: "8px 16px",

  fontSize: "1rem",
  color: "white",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: "#f31260",
  },
});

const ConfirmUser = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [confirmUser] = useMutation(CONFIRM_USER, {
    onCompleted() {
      setIsLoading(false);
      setIsConfirmed(true);
    },
    variables: {
      token: params.token,
    },
  });

  const handleConfirmUser = async () => {
    setIsLoading(true);
    await confirmUser();
  };

  const navigate = useNavigate();

  return (
    <div className="confirmUser">
      <Card
        shadow={false}
        hoverable
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
          width: "500px",
        }}
      >
        <div className="confirmUser__img-container">
          <img src={logo} alt="" />
        </div>
        <h1>Văn Lang Feeds</h1>
        {isConfirmed ? (
          <>
            <p>Xác thực thành công!</p>
            <ConfirmButton
              variant="contained"
              onClick={() => navigate("/auth/login")}
            >
              Về trang đăng nhập
            </ConfirmButton>
          </>
        ) : (
          <>
            <p>Chọn vào nút bên dưới để xác thực tài khoản nhé!</p>
            <ConfirmButton
              variant="contained"
              onClick={() => handleConfirmUser()}
            >
              {isLoading ? <Loading color="white" /> : "Xác thực"}
            </ConfirmButton>
          </>
        )}
      </Card>
    </div>
  );
};

const CONFIRM_USER = gql`
  mutation confirmUser($token: String!) {
    confirmUser(token: $token) {
      message
    }
  }
`;
export default ConfirmUser;
