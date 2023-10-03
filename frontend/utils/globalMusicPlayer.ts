import React, {useEffect, useState} from "react";
import { Audio } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentMusicPath } from "../store/music"; // selectCurrentMusicPath 선택자를 가져옴

const GlobalMusicPlayer = () => {
    const currentMusicPath = useSelector(selectCurrentMusicPath); // 현재 음악 파일 경로를 선택
    const dispatch = useDispatch();
    const [sound, setSound] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadAndPlayBackgroundMusic() {
            try {
                if (currentMusicPath) {
                    const { sound: newSound } = await Audio.Sound.createAsync(
                        { uri: currentMusicPath },
                        {
                            shouldPlay: true,
                            isLooping: true,
                        }
                    );

                    if (isMounted) {
                        setSound(newSound);
                    }
                }
            } catch (error) {
                console.error("Error loading and playing background music:", error);
            }
        }

        loadAndPlayBackgroundMusic();

        return () => {
            isMounted = false;
        };
    }, [currentMusicPath]);

    return null;
};

export default GlobalMusicPlayer;
