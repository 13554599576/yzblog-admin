import axios from "./axios";

const url = "/admin/tbRoles";

export const reqGetRoles = () => axios.get(url, null);
