import axios from "./axios";

const url = "/admin/login";

/**
 * 用户登录
 * @param {} userAddDTO
 */
export const reqLogin = userAddDTO => axios.post(url, userAddDTO, null);

/**
 * token查询用户信息
 * @param {} token
 */
export const reqGetToken = token => axios.get(url, { params: { token } });

export const reqDeleteToken = token => axios.delete(url, { params: { token } });
