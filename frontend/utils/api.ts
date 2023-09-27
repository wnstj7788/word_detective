import axios from "axios";

//기본 axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://j9b105.p.ssafy.io",
});

//유저 관련 api
export const UserAPI = {
  //param에 userId가 있으면 해당 유저의 스테이지 클리어 기록을 리턴 없으면 새로운 uuid를 생성해서 리턴
  getById: function (userId?: number) {
    return axiosInstance.request({
      method: "GET",
      url: `/api/user`,
      data: userId,
    });
  },
  //   create: function (user) {
  //     return axiosInstance.request({
  //       method: "POST",
  //       url: `/api/users`,
  //       data: user,
  //     });
  //   },
  //   update: function (userId, user) {
  //     return axiosInstance.request({
  //       method: "PUT",
  //       url: `/api/users/${userId}`,
  //       data: user,
  //     });
  //   },
};

//단어 관련 api
export const WordAPI = {
  // getAll: function () {
  //   return axiosInstance.request({
  //     method: "GET",
  //     url: `/api/word`,
  //   });
  // },
  // getById: function (wordId: number) {
  //   return axiosInstance.request({
  //     method: "GET",
  //     url: `/api/word/${wordId}`,
  //   });
  // },
  //이름 순으로 단어 조회
  //categoryId(1 : 과일 / 2 : 동물 / 3 : 사물)
  getByCategory: function (categoryId: number) {
    return axiosInstance.request({
      method: "GET",
      url: `/api/word/cate/${categoryId}`,
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
