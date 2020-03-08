import axios from "./axios";

const url = "/admin/tbUsers";

/**
 * 分页查询用户
 * @param {*} current
 * @param {*} size
 */
export const reqGetUsersPage = (current, size, keyWord) =>
  axios.get(url + "/getUsersPage", { params: { current, size, keyWord } });

/**
 * 添加用户
 * @param {*} user
 */
export const reqAddUser = user => axios.post(url, user, null);

/**
 * 根据id查询用户
 * @param {*} id
 */
export const reqGetUserById = id => axios.get(url + "/" + id, null);

/**
 * 根据id更新用户
 * @param {*} user
 */
export const reqUpdateUserById = user => axios.put(url, user, null);

/**
 * 根据id删除用户
 * @param {*} id 
 */
export const reqDeleteUserById = id => axios.delete(url + "/" + id, null);
