import { AuthContext } from "@/Provider/AuthProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropType from "prop-types";

function PublicRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/todolist" />;
  }

  return children;
}

PublicRoute.propTypes = {
  children: PropType.node.isRequired,
};

export default PublicRoute;
