import axiosInstance from "./axiosInstance";

export const validateProject = async (data) => {
    return axiosInstance.post("/project/validate", data);
};
