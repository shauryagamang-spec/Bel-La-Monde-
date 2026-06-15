import { z } from "zod";

export const ENQUIRY_KINDS = ["wedding", "corporate", "contact"] as const;
export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

// Shared by the client form (validation) and the API route (server re-validation).
// Only name/email/phone are required; everything else is helpful-but-optional so
// the form never blocks a genuine enquiry.
export const enquirySchema = z.object({
  kind: z.enum(ENQUIRY_KINDS),
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  message: z.string().max(2000).optional(),
  company: z.string().optional(),
  headcount: z.string().optional(),
  guestCount: z.string().optional(),
  dates: z.string().optional(),
  nights: z.string().optional(),
  requirements: z.string().optional(),
  functions: z.array(z.string()).optional(),
  // anti-spam: honeypot must stay empty; _t is the form mount time (time-trap).
  company_website: z.string().max(0).optional(),
  _t: z.number().optional(),
});

export type EnquiryData = z.infer<typeof enquirySchema>;
