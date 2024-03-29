import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages";
import userEvent from "@testing-library/user-event";
import { todoMock } from "@/__mock__/todo";
import { Todo } from "@/atoms/todoAtom";

describe("ToDo追加のテスト", () => {
  it("追加ボタン押下時、モーダルが開くこと", async () => {
    render(<Home />);

    const button = screen.getByRole("button", {
      name: /New ToDo/,
    });

    await userEvent.click(button);

    const modal = screen.getByRole("dialog", { name: "Create ToDo" });

    expect(modal).toBeInTheDocument();
  });
  it("内容を入力し、作成を押すと新しくToDoが追加されること", async () => {
    // 初期表示のfetchをモック化
    global.fetch = jest.fn().mockImplementationOnce(async () => {
      return {
        ok: true,
        json: async () => todoMock,
      };
    });

    render(<Home />);

    const input = screen.getByRole("textbox");

    const newTodo: Todo = {
      id: 4,
      text: "ご飯買いに行く",
      completed: false,
    };

    await userEvent.type(input, newTodo.text);

    const addButton = screen.getByRole("button", {
      name: "作成する",
    });

    // 再取得のfetchをモック化(POST含めて2回分)
    global.fetch = jest.fn().mockImplementation(async () => {
      return {
        ok: true,
        json: async () => {
          return [...todoMock, newTodo];
        },
      };
    });
    await userEvent.click(addButton);

    const toDos = screen.getAllByRole("listitem");

    expect(toDos).toHaveLength(todoMock.length + 1);
  });
});
