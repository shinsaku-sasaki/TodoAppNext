import { atom } from "jotai";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type ModalType = "add" | "edit" | "";

type ModalAtomType = {
  type: ModalType;
  target: Todo | null;
};

export const initialModalAtomValue: ModalAtomType = { type: "", target: null };
export const modalAtom = atom<ModalAtomType>(initialModalAtomValue);
