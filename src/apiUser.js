import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3001";
// const BASE_URL = "https://cityzen-app.herokuapp.com";

// Axios documentation: https://github.com/axios/axios
// One important difference between fetch and axios is that axios's Promise automatically resolved to an Object.
// This means that you don't need to call res.json()
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
          setError(err);
          setLoading(false);
          console.log(err.response);
          if (err.response.status === 400 || err.response.status === 401) {
            console.log("bad token");
            setToken(null);
            localStorage.removeItem("auth-token");
          }
          console.error(err.response);
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
