import { createContext } from "react";

export const chatdispatchcontext = createContext({
    dispath: () => { },
    socket: null,
    state: {}
})