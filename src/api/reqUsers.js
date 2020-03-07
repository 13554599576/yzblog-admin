import axios from "./axios";

const url = "/admin/tbUsers";

/**
 * 分页查询用户
 * @param {*} current
 * @param {*} size
 */
export const reqGetUsersPage = (current, size, keyWord) =>
  axios.get(url + "/getUsersPage", { params: { current, size, keyWord } });
