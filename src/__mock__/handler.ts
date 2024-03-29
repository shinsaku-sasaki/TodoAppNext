import { HttpResponse, http } from "msw";
import { todoMock } from "./todo";

export const handlers = [
  http.get(`/api/todos`, ({ request }) => {
    return HttpResponse.json(todoMock);
  }),
];
