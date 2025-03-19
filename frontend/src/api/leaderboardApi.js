import axiosInstance from "./axiosInstance";

export const getLeaderboard = async () => {
    return axiosInstance.get("/leaderboard");
};
