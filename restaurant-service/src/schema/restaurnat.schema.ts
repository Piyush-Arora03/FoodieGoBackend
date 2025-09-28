import { z } from 'zod';


export const addRestaurantSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: "Restaurant name is required" }),
        description: z.string().min(1, { message: 'Description is required' }),
        street: z.string().min(1, { message: 'Street is required' }),
        city: z.string().min(1, { message: 'City is required' }),
        state: z.string().min(1, { message: 'State is required' }),
        postalCode: z.string().min(1, { message: 'Postal code is required' }),
        cuisine: z.string().min(1, { message: 'Cuisine is required' }),
        operatingHours: z.any(),
    }),
    headers: z.object({
        'x-package-name': z.string().min(1, { message: 'X-Package-Name header is required' }),
    })
});

export const addMenuItemSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: "Menu item name is required" }),
        description: z.string().min(1, { message: 'Description is required' }),
        price: z.string().transform(val => parseFloat(val)),
        categoryId: z.string(),
    }),
    headers: z.object({
        'x-package-name': z.string().min(1, { message: 'X-Package-Name header is required' }),
    }),
    params: z.object({
        restaurantId: z.string().cuid(),
    }),
});

export const searchSchema = z.object({
    query: z.object({
        q: z.string().min(1, { message: 'Search query is required' }),
        cuisine: z.string().optional(),
    }),
    headers: z.object({
        'x-package-name': z.string().min(1, { message: 'X-Package-Name header is required' }),
    }),
});

export const setItemAvailabilitySchema = z.object({
    body: z.object({
        isAvailable: z.boolean(),
    }),
    param: z.object({
        itemId: z.string().cuid(),
    }),
    headers: z.object({
        'x-package-name': z.string().min(1, { message: 'X-Package-Name header is required' }),
    }),
});

export const itemIdsSchema = z.object({
    body: z.object({
        itemIds: z.array(z.string().cuid()).min(1, { message: 'Atleast one itemId is required' }),
    }),
    headers: z.object({
        'x-package-name': z.string().min(1, { message: 'X-Package-Name header is required' }),
    }),
});