module.exports = {
  openapi: "3.0.0",
  info: { title: "Multicom API", version: "1.0.0" },
  components: {
    securitySchemes: { bearerAuth: { type: "http", scheme: "bearer" } },
  },
  paths: {
    "/auth/register": {
      post: {
        summary: "Register a doctor or patient",
        requestBody: {
          content: {
            "application/json": {
              example: {
                name: "Dr. Anil",
                email: "anil@test.com",
                password: "secret123",
                role: "doctor",
              },
            },
          },
        },
        responses: { 201: { description: "Created" } },
      },
    },
    "/auth/login": {
      post: {
        summary: "Login and get a JWT",
        requestBody: {
          content: {
            "application/json": {
              example: { email: "anil@test.com", password: "secret123" },
            },
          },
        },
        responses: { 200: { description: "Returns token" } },
      },
    },
    "/me": {
      get: {
        summary: "My profile",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "OK" } },
      },
    },
    "/patients": {
      get: {
        summary: "List patients (doctor only)",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "OK" }, 403: { description: "Forbidden" } },
      },
    },
  },
};
