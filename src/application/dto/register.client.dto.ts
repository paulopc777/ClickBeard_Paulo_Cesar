import { Type } from "@fastify/type-provider-typebox";

const RequestRegisterClientDto = Type.Object({
    email: Type.String({
        format: "email"
    }),
    password: Type.String({
        minLength: 6,
        maxLength: 64
    }),
    name: Type.String({
        minLength: 1,
        maxLength: 100
    })
});

const ResponseRegisterClientDto = Type.Object({
    user: Type.Object({
        id: Type.String(),
        email: Type.String({
            format: "email"
        }),
        name: Type.String()
    })
});

export {
    RequestRegisterClientDto,
    ResponseRegisterClientDto
}