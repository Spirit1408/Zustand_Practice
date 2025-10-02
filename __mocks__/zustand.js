import { act } from "react";
import { beforeEach, vi } from "vitest";

const { create: actualCreate } = await vi.importActual("zustand");
const storeResetFns = new Set(); //* Variable to hold reset functions for all stores declared in the app

export const create = (createState) => {
    const store = actualCreate(createState);
    const initialState = store.getState();
    storeResetFns.add(() => store.setState(initialState, true));
    return store;
}; //* When creating a store, we get its inital state, create a reset function (for backing to the initial state of the store) and add it to the set of reset functions.

beforeEach(() => {
    act(() => {
        storeResetFns.forEach((resetFn) => resetFn());
    })
}) //* Before each test, we reset all stores to its initial state.