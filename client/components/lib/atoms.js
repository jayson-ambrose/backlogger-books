import { atom } from "recoil";

export const activeAccountAtom = atom({
    key: 'activeKey',
    default: {},
})

export const loggedInAtom = atom ({
    key: 'loggedInKey',
    default: false,
})