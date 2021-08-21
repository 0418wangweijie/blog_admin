import servicePath from "../config/apiAdminUrl";
import request from "../plugins/request";

export async function postLogin(params) {
  // 后面再完善封装的方法
  // return request({
  //   url: `${servicePath.login}`,
  //   method: "POST",
  //   data: params,
  // });
  return fetch(`${servicePath.login}`, {
    method: "post",
    body: JSON.stringify(params),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
}
