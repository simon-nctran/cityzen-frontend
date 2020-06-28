import { useState, useEffect } from "react";
import axios from "axios";
// Axios documentation: https://github.com/axios/axios

const BASE_URL = "https://cityzen-app.herokuapp.com";

axios.defaults.baseURL = BASE_URL;

export function getLogin(username, password) {
  const path = "/users/login";

  return axios.post(path, {
    username,
    password,
  });
}

function getUser(token) {
  const path = "/users/data";
  return axios.get(path, {
    headers: { "x-auth-token": token },
  });
}

export function useUser(token, setToken) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
    setUserData(null);
    setError(null);
    if (token !== null) {
      setLoading(true);
      getUser(token)
        .then((res) => {
          setUserData({
            ...res.data,
          });
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          if (err.response && (err.response.status === 400 || err.response.status === 401)) {
            setToken(null);
            localStorage.removeItem("auth-token");
          }
        });
    }
  }, [token, setToken]);

  return {
    loading,
    userData,
    error,
  };
}

export function addUser(username, password) {
  const path = "/users/new";

  return axios.post(path, {
    username,
    password,
  });
}
