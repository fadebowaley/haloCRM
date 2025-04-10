import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

// step 1
export const startingTypeSchema = z.object({
  startingType: z.string().nonempty(messages.startingTypeIsRequired),
});

export type StartingTypeSchema = z.infer<typeof startingTypeSchema>;

// step 2
export const listingUnitSchema = z.object({
  listingUnit: z.string().nonempty(messages.listingUnitIsRequired),
});

export type ListingUnitSchema = z.infer<typeof listingUnitSchema>;

// step 3
export const basicInformationSchema = z.object({
  propertyFor: z.string().min(1, messages.propertyForIsRequired),
  propertyName: z.string().min(1, messages.propertyNameIsRequired),
  propertyType: z.string().min(1, messages.propertyTypeIsRequired),
  city: z.string().optional(),
  address: z.string().optional(),
  constructionStatus: z.string().optional(),
  productDescription: z.string().optional(),
});

export type BasicInformationSchemaType = z.infer<typeof basicInformationSchema>;

// step 4
export const basicFeaturesSchema = z.object({
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  guests: z.number().optional(),
});

export type BasicFeaturesSchema = z.infer<typeof basicFeaturesSchema>;

// step 5
export const formPhotosSchema = z.object({
  photos: z.array(fileSchema).optional(),
});

export type FormPhotosSchema = z.infer<typeof formPhotosSchema>;

// step 6
export const sizeAndPricingSchema = z.object({
  priceType: z.string().nonempty(messages.priceTypeIsRequired),
  totalPrice: z.number({ message: messages.totalPriceIsRequired}),
  pricePerSquare: z.number({ message: messages.pricePerSquareRequired }),
  propertySize: z.number({ message: messages.productSizeRequired }),
});

export type SizeAndPricingSchema = z.infer<typeof sizeAndPricingSchema>;
