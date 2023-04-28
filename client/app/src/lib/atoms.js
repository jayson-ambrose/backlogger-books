import { atom } from "recoil";

export const activeAtom = atom({
    key: 'activeKey',
    default: {},
})

export const loggedInAtom = atom ({
    key: 'loggedInKey',
    default: false,
})