import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages";
import userEvent from "@testing-library/user-event";
import { initialTodos } from "@/atoms/todoAtom";

describe("ToDo削除のテスト", () => {
  it("削除ボタン押下時、モーダルが開くこと", async () => {
    render(<Home />);

    const deleteIconButton = screen.getAllByRole("button", {
      name: "Delete",
    })[0];

    await userEvent.click(deleteIconButton);

    const toDos = screen.getAllByRole("listitem");
    expect(toDos).toHaveLength(initialTodos.length - 1);
  });
});
