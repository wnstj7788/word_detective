//리덕스 타입 지정 훅
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

// export const useAppDispatch: () => AppDispatch = useDispatch;
/**
 * useSelector 대신 사용하는 훅.
 * 매번 타입 지정해줘야하는 번거로움 해결.
 * const user = useSelector((state: RootState) => state.user); 대신에
 * const user = useAppSelector((state) => state.user); 와 같이 사용하면 됨
 */
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector;
