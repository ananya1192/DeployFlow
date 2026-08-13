const request = require("supertest");
const app = require("../src/app");

describe("Task API", () => {

  // GET
  test("GET /tasks should return an array", async () => {
    const response = await request(app).get("/tasks");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // POST
  test("POST /tasks should create a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Learn Kubernetes",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Learn Kubernetes");
    expect(response.body.completed).toBe(false);
    expect(response.body.id).toBeDefined();
  });

  // POST - validation
  test("POST /tasks should reject a task without a title", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Title is required");
  });

  // PUT
  test("PUT /tasks/:id should update a task", async () => {
    const createResponse = await request(app)
      .post("/tasks")
      .send({
        title: "Learn Docker",
      });

    const taskId = createResponse.body.id;

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send({
        completed: true,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(taskId);
    expect(response.body.completed).toBe(true);
  });

  // PUT - missing task
  test("PUT /tasks/:id should return 404 for a missing task", async () => {
    const response = await request(app)
      .put("/tasks/99999")
      .send({
        completed: true,
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Task not found");
  });

  // DELETE
  test("DELETE /tasks/:id should delete a task", async () => {
    const createResponse = await request(app)
      .post("/tasks")
      .send({
        title: "Learn Kubernetes",
      });

    const taskId = createResponse.body.id;

    const response = await request(app)
      .delete(`/tasks/${taskId}`);

    expect(response.statusCode).toBe(204);
  });

});