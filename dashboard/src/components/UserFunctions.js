import axios from "axios";

export const register = (newUser) => {
    return axios
        .post("http://192.168.1.23:5000/admin/register", {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        })
        .then((response) => {
            console.log("Registered");
        });
};

export const login = (user) => {
    return axios
        .post("http://192.168.1.23:5000/admin/login", {
            email: user.email,
            password: user.password,
        })
        .then((response) => {
            localStorage.setItem("usertoken", response.data._token);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getProfile = (user) => {
    return axios
        .get("http://192.168.1.23:5000/admin/profile", {
            //headers: { Authorization: ` ${this.getToken()}` }
        })
        .then((response) => {
            console.log(response);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
};
