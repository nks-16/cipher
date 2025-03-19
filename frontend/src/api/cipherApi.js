import axiosInstance from "./axiosInstance";

export const validateCipher = async (data) => {
    return axiosInstance.post("/cipher/validate", data);
};
