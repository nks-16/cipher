import axiosInstance from "./axiosInstance";

export const validateReport = async (data) => {
    return axiosInstance.post("/report/validate", data);
};
