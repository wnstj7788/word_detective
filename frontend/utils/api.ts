import axios from "axios";

//기본 axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "/",
});

//유저 관련 api
export const UserAPI = {
  getAll: function () {
    return axiosInstance.request({
      method: "GET",
      url: `/api/users`,
      headers: {
        //인증토큰 등
      },
    });
  },
  getById: function (userId: number) {
    return axiosInstance.request({
      method: "GET",
      url: `/api/users/${userId}`,
    });
  },
  //   create: function (user) {
  //     return axiosInstance.request({
  //       method: "POST",
  //       url: `/api/v1/users`,
  //       data: user,
  //     });
  //   },
  //   update: function (userId, user) {
  //     return axiosInstance.request({
  //       method: "PUT",
  //       url: `/api/v1/users/${userId}`,
  //       data: user,
  //     });
  //   },
};

//단어 관련 api
export const WordAPI = {
  getAll: function () {
    return axiosInstance.request({
      method: "GET",
      url: `/api/word`,
    });
  },
  getById: function (wordId: number) {
    return axiosInstance.request({
      method: "GET",
      url: `/api/word/${wordId}`,
    });
  },
  getByCategory: function (category: number) {
    return axiosInstance.request({
      method: "GET",
      url: `/api/word/cate/${category}`,
    });
  },
};

//문제 관련 api
export const RandomAPI = {
  getRandom: function (total: number, targetWord: number) {
    return axiosInstance.request({
      method: "GET",
      url: `/api/random/${total}/${targetWord}`,
    });
  },
};
