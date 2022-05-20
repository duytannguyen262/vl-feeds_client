import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { motion } from "framer-motion";
import SingleUserMainContent from "./components/SingleUserMainContent";
import { FETCH_USER_QUERY } from "../../util/graphql";
import { Loading } from "@nextui-org/react";

const SingleUser = () => {
  const params = useParams();
  const { data, loading } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: params.userId,
    },
  });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar />
      <div className="wrapper">
        {loading ? (
          <Loading className="d-flex align-center justify-content-center" />
        ) : (
          <>
            <SingleUserMainContent user={data.getUser} />
          </>
        )}
      </div>
    </motion.div>
  );
};
export default SingleUser;
