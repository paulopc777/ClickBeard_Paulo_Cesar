
import { Type } from '@sinclair/typebox'

const RequestAuthClientDto = Type.Object({
    email: Type.String({
        format: 'email'
    }),
    password: Type.String({
        minLength: 6,
        maxLength: 64
    })
})

const ResponseAuthClientDto = Type.Object({
    token: Type.String(),
    user: Type.Object({
        id: Type.String(),
        email: Type.String(),
        name: Type.String(),
        barber: Type.Boolean()
    })
})

export {
    RequestAuthClientDto,   
    ResponseAuthClientDto
}
