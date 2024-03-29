import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages";
import userEvent from "@testing-library/user-event";
import { todoMock } from "@/__mock__/todo";
import { handlers } from "@/__mock__/handler";
import { setupServer } from "msw/node";

describe("ToDo完了のテスト", () => {
  beforeAll(() => {
    const server = setupServer(...handlers);
    server.listen();
  });
  it("完了ボタン押下時、完了が1つ増えること", async () => {
    const completeIconButton = screen.getAllByRole("button", {
      name: "Complete",
    })[0];

    await userEvent.click(completeIconButton);

    const checkedButtonList = screen
      .getAllByLabelText("Complete")
      .filter((item) => item.children.length);

    expect(checkedButtonList).toHaveLength(
      todoMock.filter((todo) => todo.completed).length + 1
    );
  });
  it("完了ボタンを再度押下時、完了が1つ減ること", async () => {
    render(<Home />);
    const completeIconButton = screen.getAllByRole("button", {
      name: "Complete",
    })[0];

    await userEvent.click(completeIconButton);
    const checkedButtonList = screen
      .getAllByLabelText("Complete")
      .filter((item) => item.children.length);

    expect(checkedButtonList).toHaveLength(
      todoMock.filter((todo) => todo.completed).length + -1
    );
  });
});
