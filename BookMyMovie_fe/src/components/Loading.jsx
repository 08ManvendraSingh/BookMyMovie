import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const Loading = () => {
  const { nextUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate("/" + nextUrl);
      }, 8000);
    }
  }, []);

  return <div>Loading</div>;
};

export default Loading;
