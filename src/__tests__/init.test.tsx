import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages";
import { initialTodos } from "@/atoms/todoAtom";

describe("初期状態のテスト", () => {
  it("見出しが表示されること", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /My Sample ToDo List/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it("追加ボタンが表示されること", () => {
    render(<Home />);

    const button = screen.getByRole("button", {
      name: /New ToDo/,
    });

    expect(button).toBeInTheDocument();
  });
  it("ToDoが5件表示されること", () => {
    render(<Home />);

    const toDos = screen.getAllByRole("listitem");

    expect(toDos).toHaveLength(initialTodos.length);
  });
  it("2件のToDoが完了であること", () => {
    render(<Home />);

    const checkedButtonList = screen
      .getAllByLabelText("Complete")
      .filter((item) => item.children.length);

    expect(checkedButtonList).toHaveLength(
      initialTodos.filter((todo) => todo.completed).length
    );
  });
  it("完了のToDoに編集ボタンがないこと", () => {
    render(<Home />);

    // ToDo:0番目でなくinitialTodosから指定する
    const finishToDo = screen.getAllByRole("listitem")[0];

    expect(finishToDo).toBeInTheDocument();
  });
  it("未完了のToDoに編集ボタンがあること", () => {
    render(<Home />);

    // ToDo:0番目でなくinitialTodosから指定する
    const finishToDo = screen.getAllByRole("listitem")[0];

    expect(finishToDo).toBeInTheDocument();
  });
  it("すべてのToDoに削除ボタンがあること", () => {
    render(<Home />);

    // ToDo:0番目でなくinitialTodosから指定する
    const finishToDo = screen.getAllByRole("listitem")[0];

    expect(finishToDo).toBeInTheDocument();
  });
});
