import axiosInstance from "./axiosInstance";

export const validateDraft = async (data) => {
    return axiosInstance.post("/draft/validate", data);
};
