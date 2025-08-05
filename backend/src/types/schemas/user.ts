import { Static, Type } from "@sinclair/typebox";

export const LoginParams = Type.Object(
  {
    email: Type.String({
      format: "email",
      examples: [
        "admin@trazabilidad.uy",
        "operador@mgap.gub.uy",
        "ganadero1@outlook.com",
      ],
    }),
    password: Type.String({
      minLength: 6,
      examples: ["admin123", "opera123", "gana123"],
    }),
  },
  {
    examples: [
      {
        email: "admin@trazabilidad.uy",
        password: "admin123",
      },
      {
        email: "operador@mgap.gub.uy",
        password: "opera123",
      },
      {
        email: "ganadero1@outlook.com",
        password: "gana123",
      },
    ],
  }
);

export const LoginResponse = Type.Object(
  {
    token: Type.String({
      examples: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."],
    }),
    user: Type.Object({
      id: Type.String({
        format: "uuid",
        examples: [
          "de3d6619-7d68-45a6-80df-2d464b6716d4",
          "100dc01b-7225-4893-b853-0c9bf1804bc4",
        ],
      }),
      email: Type.String({
        format: "email",
        examples: ["admin@trazabilidad.uy", "operador@mgap.gub.uy"],
      }),
      role_id: Type.Integer({
        examples: [3, 1, 2],
      }),
      created_at: Type.String({
        format: "date-time",
        examples: ["2023-01-01T00:00:00Z", "2023-02-15T12:30:00Z"],
      }),
    }),
  },
  {
    examples: [
      {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: "de3d6619-7d68-45a6-80df-2d464b6716d4",
          email: "admin@trazabilidad.uy",
          role_id: 3,
          created_at: "2023-01-01T00:00:00Z",
        },
      },
      {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: "100dc01b-7225-4893-b853-0c9bf1804bc4",
          email: "operador@mgap.gub.uy",
          role_id: 1,
          created_at: "2023-02-15T12:30:00Z",
        },
      },
    ],
  }
);

export const UserParams = Type.Object({
  user_id: Type.String({
    format: "uuid",
    examples: [
      "de3d6619-7d68-45a6-80df-2d464b6716d4",
      "100dc01b-7225-4893-b853-0c9bf1804bc4",
    ],
  }),
});

export const UserSchema = Type.Object(
  {
    id: Type.String({
      format: "uuid",
      examples: [
        "de3d6619-7d68-45a6-80df-2d464b6716d4",
        "100dc01b-7225-4893-b853-0c9bf1804bc4",
      ],
    }),
    email: Type.String({
      format: "email",
      examples: ["admin@trazabilidad.uy", "operador@mgap.gub.uy"],
    }),
    password_hash: Type.String({
      examples: ["$2a$10$...hashedpassword..."],
    }),
    role_id: Type.Integer({
      examples: [3, 1, 2],
    }),
    created_at: Type.String({
      format: "date-time",
      examples: ["2023-01-01T00:00:00Z", "2023-02-15T12:30:00Z"],
    }),
  },
  {
    examples: [
      {
        id: "de3d6619-7d68-45a6-80df-2d464b6716d4",
        email: "admin@trazabilidad.uy",
        password_hash: "$2a$10$...hashedpassword...",
        role_id: 3,
        created_at: "2023-01-01T00:00:00Z",
      },
      {
        id: "100dc01b-7225-4893-b853-0c9bf1804bc4",
        email: "operador@mgap.gub.uy",
        password_hash: "$2a$10$...hashedpassword...",
        role_id: 1,
        created_at: "2023-02-15T12:30:00Z",
      },
    ],
  }
);

export const UserResponseSchema = Type.Omit(UserSchema, ["password_hash"], {
  examples: [
    {
      id: "de3d6619-7d68-45a6-80df-2d464b6716d4",
      email: "admin@trazabilidad.uy",
      role_id: 3,
      created_at: "2023-01-01T00:00:00Z",
    },
    {
      id: "100dc01b-7225-4893-b853-0c9bf1804bc4",
      email: "operador@mgap.gub.uy",
      role_id: 1,
      created_at: "2023-02-15T12:30:00Z",
    },
  ],
});
export type UserResponse = Static<typeof UserResponseSchema>;

export const UpdateUserSchema = Type.Object(
  {
    email: Type.Optional(
      Type.String({
        format: "email",
        examples: ["admin.nuevo@trazabilidad.uy", "operador.nuevo@mgap.gub.uy"],
      })
    ),
    role_id: Type.Optional(
      Type.Integer({
        examples: [1, 2, 3],
      })
    ),
  },
  {
    examples: [
      { email: "admin.nuevo@trazabilidad.uy" },
      { role_id: 2 },
      {
        email: "operador.nuevo@mgap.gub.uy",
        role_id: 1,
      },
    ],
  }
);
export type UpdateUserType = Static<typeof UpdateUserSchema>;

export const UserPostSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      examples: ["nuevo@trazabilidad.uy", "nuevo.operador@mgap.gub.uy"],
    }),
    password: Type.String({
      minLength: 6,
      examples: ["password123", "securePass456"],
    }),
    repeatPassword: Type.String({
      minLength: 6,
      examples: ["password123", "securePass456"],
    }),
    role_id: Type.Integer({
      examples: [1, 2, 3],
    }),
  },
  {
    examples: [
      {
        email: "nuevo@trazabilidad.uy",
        password: "password123",
        repeatPassword: "password123",
        role_id: 2,
      },
      {
        email: "nuevo.operador@mgap.gub.uy",
        password: "securePass456",
        repeatPassword: "securePass456",
        role_id: 1,
      },
    ],
  }
);
export type UserPostType = Static<typeof UserPostSchema>;
export type User = Static<typeof UserSchema>;
export type LoginType = Static<typeof LoginParams>;
export type LoginResponseType = Static<typeof LoginResponse>;
export type UserParamsType = Static<typeof UserParams>;
