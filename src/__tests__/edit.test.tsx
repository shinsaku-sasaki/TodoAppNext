import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages";
import { initialTodos } from "@/atoms/todoAtom";
import userEvent from "@testing-library/user-event";

describe("ToDo編集のテスト", () => {
  it("編集ボタン押下時、モーダルが開くこと", async () => {
    render(<Home />);

    const editIconButton = screen.getAllByRole("button", {
      name: "Edit",
    })[0];

    await userEvent.click(editIconButton);

    const modal = screen.getByRole("dialog", { name: "Edit ToDo" });

    expect(modal).toBeInTheDocument();
  });
  it("内容を入力し、作成を押すとToDoが更新されること", async () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("食料品を買う");

    await userEvent.clear(input);
    await userEvent.type(input, "時計を修理に出す");

    const editButton = screen.getByRole("button", {
      name: "更新する",
    });
    await userEvent.click(editButton);

    const toDos = screen.getAllByRole("listitem");

    expect(toDos).toHaveLength(initialTodos.length);
    expect(screen.getByText("時計を修理に出す")).toBeInTheDocument();
  });
});
