import {z} from 'zod';


export const addRestaurantSchema=z.object({
    body:z.object({
        name:z.string().min(1,{message:"Restaurant name is required"}),
        description: z.string().min(1,{ message: 'Description is required' }),
        street: z.string().min(1,{ message: 'Street is required' }),
        city: z.string().min(1,{ message: 'City is required' }),
        state: z.string().min(1,{ message: 'State is required' }),
        postalCode: z.string().min(1,{ message: 'Postal code is required' }),
        latitude: z.number().refine(val => Math.abs(val) <= 90),
        longitude: z.number().refine(val => Math.abs(val) <= 180),
        cuisine: z.string().min(1,{ message: 'Cuisine is required' }),
        operatingHours: z.any(),
    }),
    headers: z.object({
    'x-package-name': z.string().min(1, { message: 'X-Package-Name header is required' }),
  })
});

export const addMenuItemSchema=z.object({
    body:z.object({
        name:z.string().min(1,{message:"Menu item name is required"}),
        description: z.string().min(1,{ message: 'Description is required' }),
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