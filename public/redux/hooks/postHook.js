import { useSelector } from "react-redux";
import { postAssetsSelector } from "../selectors"

export const usePostPackageHook = () =>
{
    return useSelector(postAssetsSelector)
}