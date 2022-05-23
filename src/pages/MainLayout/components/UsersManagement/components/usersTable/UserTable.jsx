import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";

import userImg from "../../../../../../assets/user.png";
import trashIcon from "../../../../../../assets/icons/trash.svg";
import "./usersTable.scss";
import { Button, FormControl, MenuItem, Select } from "@mui/material";

export default function DataTable() {
  const { refetch, data, loading } = useQuery(GET_USERS);
  const [userRows, setUserRows] = React.useState([]);
  const [toUpdateUserRows, setToUpdateUserRows] = React.useState([]);
  const [selectedRowIds, setSelectedRowIs] = React.useState([]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 210,
      renderCell: (params) => (
        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#666",
            backgroundColor: "#f4f4f4",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {params.id}
        </div>
      ),
    },
    {
      field: "user",
      headerName: "Người dùng",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="cellWrapper">
            <img
              src={params.row.avatar.url ? params.row.avatar.url : userImg}
              alt=""
            />
            <span style={{ fontWeight: "500" }}>{params.row.username}</span>
          </div>
        );
      },
    },
    {
      field: "role",
      headerName: "Vai trò",
      width: 170,
      renderCell: (params) => {
        const handleChange = (e) => {
          const selectedRole = e.target.value;
          setToUpdateUserRows([
            {
              id: params.row.id,
              username: params.row.username,
              role: selectedRole,
            },
            ...toUpdateUserRows,
          ]);
        };
        return (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              defaultValue={params.row.role}
              value={params.row.role}
              onChange={(e) => handleChange(e)}
              sx={{ fontSize: "14px" }}
            >
              <MenuItem value="student">Sinh viên</MenuItem>
              <MenuItem value="teacher">Giảng viên</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="banned">Bị cấm</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 290,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 100,
      renderCell: (params) => {
        return <div>{moment(params.row.createdAt).format("DD/MM/YYYY")}</div>;
      },
    },
  ];

  React.useEffect(() => {
    refetch();
    if (data && data.getUsers) {
      setUserRows(
        data.getUsers.map((user) => {
          return {
            id: user.id,
            username: user.username,
            avatar: {
              url: user.avatar.url,
            },
            role: user.role,
            email: user.email,
            createdAt: user.createdAt,
          };
        })
      );
    }
  }, [data, refetch]);

  const [deleteUsers] = useMutation(DELETE_USERS, {
    variables: {
      ids: selectedRowIds,
    },
  });
  const handleDeleteSelected = () => {
    deleteUsers();
    refetch();
  };

  const [changeUsersRole] = useMutation(CHANGE_USERS_ROLE, {
    onCompleted: () => {
      setToUpdateUserRows([]);
    },
    variables: {
      users: toUpdateUserRows,
    },
  });
  const handleUpdateUsersRole = () => {
    changeUsersRole({
      refetchQueries: [{ query: GET_USERS }],
    });
  };

  return (
    <div style={{ height: 800, width: "100%" }}>
      {selectedRowIds.length > 0 && (
        <div className="deleteSelected">
          <Button onClick={handleDeleteSelected}>
            <img src={trashIcon} alt="" />
            <span>Xóa người dùng đã chọn</span>
          </Button>
        </div>
      )}
      {toUpdateUserRows.length > 0 && (
        <div className="updateRole">
          {toUpdateUserRows.map((user) => {
            return (
              <div key={user.id} className="mb-2">
                Cập nhật người dùng&nbsp;
                <span style={{ fontWeight: "500" }}>{user.username}</span>
                <span>&nbsp;thành vai trò </span>
                <span style={{ fontWeight: "500" }}>{user.role}</span>
              </div>
            );
          })}
          <div className="d-flex justify-content-end gap-2">
            <Button
              color="error"
              variant="outlined"
              onClick={() => setToUpdateUserRows([])}
            >
              Hủy
            </Button>
            <Button variant="outlined" onClick={handleUpdateUsersRole}>
              Cập nhật
            </Button>
          </div>
        </div>
      )}
      <DataGrid
        rows={userRows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        density="comfortable"
        checkboxSelection
        loading={loading}
        sx={{
          boxShadow: "0 6px 18px 0 rgb(32 32 149 / 10%)",
          border: "none",
          borderRadius: "10px",
        }}
        onSelectionModelChange={(data) => {
          setSelectedRowIs(data);
        }}
      />
    </div>
  );
}

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      username
      email
      avatar {
        url
        public_id
      }
      role
      createdAt
    }
  }
`;

const DELETE_USERS = gql`
  mutation deleteUsers($ids: [String!]!) {
    deleteUsers(ids: $ids) {
      message
    }
  }
`;

const CHANGE_USERS_ROLE = gql`
  mutation changeUsersRole($users: [UsersWithRoles!]!) {
    changeUsersRole(users: $users) {
      message
    }
  }
`;
