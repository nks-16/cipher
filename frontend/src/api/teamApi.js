import axiosInstance from "./axiosInstance";

export const registerTeam = async (teamData) => {
    return axiosInstance.post("/team/register", teamData);
};

export const loginTeam = async (credentials) => {
    return axiosInstance.post("/team/login", credentials);
};

export const updatePoints = async (data) => {
    return axiosInstance.post("/team/update-points", data);
};
