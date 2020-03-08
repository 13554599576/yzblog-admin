/**
 * 初始化当前页则会返回true，初始化上一页则会返回false。
 */
export default usersPage => {
  if(usersPage.total > 1) {
    return true;
  } else {
    return false;
  }
}