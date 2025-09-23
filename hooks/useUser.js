import { useContext } from "react";
import { accountContext } from "../context/accountContext";

export function useAccount(){
    const context = useContext(accountContext)

    if(!context) {
        throw new Error('Outside the scope of the Account Provider.')
    }

    return context
}