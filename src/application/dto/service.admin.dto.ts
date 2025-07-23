import { Type } from "@fastify/type-provider-typebox";

export const CreateNewServiceValidatorBody = Type.Object({
    name: Type.String({
        minLength: 1,
        maxLength: 100
    }),
    price: Type.Number({
        minimum: 0
    }),
    image: Type.Optional(Type.String({
        format: "uri"
    })),
    barbers: Type.Optional(Type.Array(Type.String({
        minLength: 1
    })))
});

export const UpdateServiceValidatorBody = Type.Object({
    name: Type.Optional(Type.String({
        minLength: 1,
        maxLength: 100
    })),
    price: Type.Optional(Type.Number({
        minimum: 0
    })),
    image: Type.Optional(Type.String({
        format: "uri"
    })),
    barbers: Type.Optional(Type.Array(Type.String({
        minLength: 1
    })))
});