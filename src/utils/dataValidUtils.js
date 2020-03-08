/**
 * 校验用户名，用户名只允许含有大小写字母和数字，长度必须是6-18位
 * @param {*} uesrName
 */
export const userNameValid = uesrName => /^[a-zA-Z0-9]{6,18}$/.test(uesrName);

/**
 * 校验密码，密码只允许含有大小写字母和数字，长度必须是6-18位
 * @param {*} userPassword
 */
export const userPasswordValid = userPassword =>
  /^[a-zA-Z0-9]{6,18}$/.test(userPassword);

/**
 * 校验确认输入的密码
 * @param {*} password
 * @param {*} confirmPassword
 */
export const userConfirmPasswordValid = (userPassword, userConfirmPassword) =>
  userPassword === userConfirmPassword;

/**
 * 校验邮箱格式
 * @param {*} userEmail
 */
export const userEmailValid = userEmail =>
  // eslint-disable-next-line
  /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(
    userEmail
  );

/**
 * 校验是否写入了数据
 * @param {*} content
 */
export const isNotEmptyValid = content => content.length !== 0;
