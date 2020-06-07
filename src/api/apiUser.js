import { useState, useEffect } from "react";
import axios from "axios";
// Axios documentation: https://github.com/axios/axios
// One important difference between fetch and axios is that axios's Promise automatically resolved to an Object.
// This means that you don't need to call res.json()

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
          console.log(res);
          setUserData({
            ...res.data,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
          if (err.response && (err.response.status === 400 || err.response.status === 401)) {
            console.error("token error");
            setToken(null);
            localStorage.removeItem("auth-token");
          }
        });
    }
  }, [token, setToken]); // put setToken in useEffect dependencies to be consistent with Hook Rules

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
