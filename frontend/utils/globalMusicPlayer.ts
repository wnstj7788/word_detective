import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { useDispatch } from "react-redux";
import useAppSelector from "../store/useAppSelector";
import { setIsPlaying } from "../store/music";

const getSoundFileURL = (name: string): any => {
  switch (name) {
    case "mainMusic":
      return require("../assets/backgroundMusic/mainMusic.mp3");
    case "pictureBgMusic":
      return require("../assets/backgroundMusic/pictureGameBgMusic.mp3");
    case "wordBgMusic":
      return require("../assets/backgroundMusic/wordGameBgMusic.mp3");
    case "letterBgMusic":
      return require("../assets/backgroundMusic/letterGameBgMusic.mp3");
  }
  // 다른 소리 파일들을 필요에 따라 추가
};

const GlobalMusicPlayer = () => {
  //현재 음악 파일 이름(위의 getSoundFileURL과 매칭됨)
  const currentMusicName = useAppSelector(state => state.music.currentMusicName);
  const isPlaying = useAppSelector(state => state.music.isPlaying); //재생중인지 여부
  const isMuted = useAppSelector(state => state.music.isMuted); //음소거인지 여부
  const dispatch = useDispatch();
  const [music, setMusic] = useState<Audio.Sound>(new Audio.Sound());

  //음악 변경 시 중지 후 재생
  useEffect(() => {
    (async () => {
      console.log("name", currentMusicName);
      if (music._loaded || isPlaying) {
        await music.stopAsync();
        await music.unloadAsync();
        await dispatch(setIsPlaying(false));
        console.log("중지 완료");
      }
      await music.loadAsync(getSoundFileURL(currentMusicName)); //지정 경로에서 음악 로드
      await music.setIsLoopingAsync(true); //반복 재생 설정
      await music.setIsMutedAsync(isMuted); //음소거 여부 설정
      await music.playAsync(); //음악 재생
      await dispatch(setIsPlaying(true));
      console.log("재생시작");
    })();
  }, [currentMusicName]);

  //음악 음소거 처리
  useEffect(() => {
    if (!music._loaded) return;
    (async () => {
      await music.setIsMutedAsync(isMuted);
    })();
  }, [isMuted]);

  return null;
};

export default GlobalMusicPlayer;
