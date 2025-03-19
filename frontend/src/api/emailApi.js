import axiosInstance from "./axiosInstance";

export const validateEmail = async (data) => {
    return axiosInstance.post("/email/validate", data);
};
