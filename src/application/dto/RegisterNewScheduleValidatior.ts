import { Type } from "@fastify/type-provider-typebox";

export const RegisterNewScheduleValidatorParams = Type.Object({
    service: Type.String(),
})
export const RegisterNewScheduleValidatorBody = Type.Object({
    barber_id: Type.String(),
    start: Type.String({ format: 'date-time' })
})