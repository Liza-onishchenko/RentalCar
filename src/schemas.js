import * as Yup from 'yup';

export const BookingSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 2 characters!')
    .max(50, 'Name must not exceed 50 characters!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  bookingDate: Yup.date()
    .required('Booking date is required')
    .min(new Date(), 'Date cannot be in the past'),
  comment: Yup.string().max(256, 'Коментар занадто довгий').optional(),
});
