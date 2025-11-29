import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";

describe("App", () => {
    test("アプリタイトルが表示されている", () => {
        render(<App />);
        expect(
            screen.getByRole("heading", { name: "📝 Todoアプリ!" })
        ).toBeInTheDocument();
    });

    test("ToDoを追加することができる", () => {
        render(<App />);

        const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
        const addButton = screen.getByRole("button", { name: "追加" });

        fireEvent.change(input, { target: { value: "テストタスク" } });
        fireEvent.click(addButton);

        const list = screen.getByRole("list");
        expect(within(list).getByText("テストタスク")).toBeInTheDocument();
    });

    test("ToDoを完了することができる", () => {
        render(<App />);

        const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
        const addButton = screen.getByRole("button", { name: "追加" });

        fireEvent.change(input, { target: { value: "テストタスク" } });
        fireEvent.click(addButton);

        const checkbox = screen.getAllByRole("checkbox")[0];
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    });

    test("完了したToDoの数が表示されている", () => {
        render(<App />);

        const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
        const addButton = screen.getByRole("button", { name: "追加" });

        fireEvent.change(input, { target: { value: "テストタスク1" } });
        fireEvent.click(addButton);

        fireEvent.change(input, { target: { value: "テストタスク2" } });
        fireEvent.click(addButton);

        const checkbox = screen.getAllByRole("checkbox")[0];
        fireEvent.click(checkbox);

        const count = screen.getByText("完了済み: 1 / 2");
        expect(count).toBeInTheDocument();
    });

    test("ToDoがない場合はToDoがないことを示すメッセージが表示されている", () => {
        render(<App />);

        expect(screen.getByText("タスクがありません")).toBeInTheDocument();
        expect(screen.getByText("新しいタスクを追加してください")).toBeInTheDocument();
    });

    test("空のToDoは追加されない", () => {
        render(<App />);

        const addButton = screen.getByRole("button", { name: "追加" });
        fireEvent.click(addButton);

        expect(screen.getByText("タスクがありません")).toBeInTheDocument();
        expect(screen.getByText("新しいタスクを追加してください")).toBeInTheDocument();
    });
})
