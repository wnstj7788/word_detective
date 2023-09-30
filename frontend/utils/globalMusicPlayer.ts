import React, { useEffect } from "react";
import { Audio } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMusic } from "../store/music";

/**
 * 백그라운드 노래 설정을 위한 컴포넌트
 * @constructor
 */


const GlobalMusicPlayer = () => {
    const currentMusic = useSelector((state) => state.music.currentMusic);
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;

        async function playBackgroundMusic() {
            if (currentMusic) {
                const { sound } = await Audio.Sound.createAsync(currentMusic, {
                    shouldPlay: true,
                    isLooping: true,
                });
                if (isMounted) {
                    await sound.playAsync();
                }
            }
        }

        playBackgroundMusic();

        return () => {
            isMounted = false;
        };
    }, [currentMusic]);

    return null;
};

export default GlobalMusicPlayer;