import axios from "axios";

//기본 axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://j9b105.p.ssafy.io",
});

//유저 관련 api
export const UserAPI = {
  /**
   * 아이디로 유저 정보 조회
   * @param userId 유저 아이디
   * @returns userId가 있으면 해당 유저의 스테이지 클리어 기록을 리턴, 없으면 새로운 userId를 생성해서 리턴
   */
  getById: function (userId?: number) {
    return axiosInstance.request({
      method: "GET",
      url: userId ? `/api/user?userId=${userId}` : `/api/user`,
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
  /**
   * 카테고리 별 단어 조회(이름 순)
   * @param categoryId 카테고리(1 : 과일 / 2 : 동물 / 3 : 사물)
   */
  getByCategory: function (categoryId: number) {
    return axiosInstance.request({
      method: "GET",
      url: `/api/word/${categoryId}`,
    });
  },
  /**
   * 게임용 랜덤 단어 목록 호출
   * @param answer 정답 단어
   * @param correctCnt 전체 목록 중 정답 단어 수
   * @param randCnt 전체 목록 중 답이 아닌 랜덤으로 나올 단어 수
   */
  getRandom: function (answer: string, correctCnt: number, randCnt: number) {
    return axiosInstance.request({
      method: "GET",
      url: `api/word?answer=${answer}&correctCnt=${correctCnt}&randCnt=${randCnt}`,
    });
  },
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
};
