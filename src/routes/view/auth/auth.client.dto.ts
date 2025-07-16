
import { Type } from '@sinclair/typebox'

const RequestAuthClientDto = Type.Object({
    email: Type.String({
        format: 'email',
        errorMessage: 'Email deve ter um formato válido'
    }),
    password: Type.String({
        minLength: 6,
        maxLength: 64,
        errorMessage: 'Senha deve ter entre 6 e 64 caracteres'
    }),
}, {
    errorMessage: 'Dados de autenticação inválidos'
})


export {
    RequestAuthClientDto
}
