import { api8083Client, api8085Client } from "./clients";

// ---------------------- WORKFLOW API 8085 ----------------------

export const getWorkflowStats = async () => {
    const response = await api8085Client.get('/api/workflow/stats');
    return response;
};

export const getWorkflowActions = async (id) => {
    const response = await api8085Client.get(`/api/workflow/actions/${id}`);
    return response;
};

export const processWorkflowAction = async (payload) => {
    const response = await api8085Client.post('/api/workflow/process', payload);
    return response;
}

// ---------------------- REGISTRATION API 8083 ----------------------

export const getFPORegistrationList = async (page = 0, size = 10, status = 2) => {
    const response = await api8083Client.get(`/api/v1/fpo/registration/list?page=${page}&size=${size}&statusId=${status}`);
    return response;
};
