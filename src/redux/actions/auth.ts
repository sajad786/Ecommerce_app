import { secureStorage } from "@/utils/secureStorage";
import { changeFirstTime, clearData, markHydrated } from "../reducers/auth";
import store from "../store";

const { dispatch } = store;

export const changeFirstTimeState = (isFirstTime: boolean) => {
    secureStorage.setItem("IS_FIRST_TIME", isFirstTime.toString()).then(() => {
        dispatch(changeFirstTime(isFirstTime))
    })
};

export const markHydratedState = (isHydrated: boolean) => {
    dispatch(markHydrated(isHydrated))
};
export const clearDataAction = () => {
    void secureStorage.removeItem("IS_FIRST_TIME");
    void secureStorage.removeItem("AUTH_TOKEN");
    void secureStorage.removeItem("USER_DATA");
    dispatch(clearData());
}