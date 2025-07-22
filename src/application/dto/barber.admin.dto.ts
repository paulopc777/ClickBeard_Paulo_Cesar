import { Type } from "@fastify/type-provider-typebox";

export const BarberRequest = Type.Object({
    name: Type.String(),
    age: Type.Number(),
    contract_date: Type.String({ format: "date-time" }),
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 6 })
})

export const BarberUpdateRequest = Type.Object({
    name: Type.Optional(Type.String()),
    age: Type.Optional(Type.Number()),
    contact_date: Type.Optional(Type.String({ format: "date-time" })),
    email: Type.Optional(Type.String({ format: "email" })),
    password: Type.Optional(Type.String({ minLength: 6 })),
    admin: Type.Optional(Type.Boolean()),
    avatar: Type.Optional(Type.String())
})