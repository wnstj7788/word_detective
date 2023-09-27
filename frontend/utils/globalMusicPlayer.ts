import React, { useEffect } from "react";
import { Audio } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMusic } from "../store/music";

const GlobalMusicPlayer = () => {
    const currentMusic = useSelector((state) => state.music.currentMusic);
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;

        async function playBackgroundMusic() {
            console.log("tes1111");
            if (currentMusic) {
                const { sound } = await Audio.Sound.createAsync(currentMusic, {
                    shouldPlay: true,
                    isLooping: true,
                });
                console.log("test2222");
                if (isMounted) {
                    await sound.playAsync();
                }
            }
            console.log("4444");
        }

        playBackgroundMusic();

        return () => {
            isMounted = false;
        };
    }, [currentMusic]);

    return null;
};

export default GlobalMusicPlayer;