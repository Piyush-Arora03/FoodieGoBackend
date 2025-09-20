import { z } from 'zod';

export const cartSchema = z.object({
    body: z.object({
        itemId: z.string().cuid('Invalid item id'),
        quantity: z.coerce.number().min(-1).max(1)
    })
});