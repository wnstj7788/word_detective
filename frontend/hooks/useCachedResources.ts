import { useEffect, useState } from "react";
import * as Font from "expo-font";

//리소스를 한번만 불러오도록 하는 훅
//폰트 등에 사용
export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          BMJUA: require("../assets/font/BMJUA_ttf.ttf"),
          Hayanbunpil: require("../assets/font/Hayanbunpil.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, [isLoadingComplete]);

  return isLoadingComplete;
}
