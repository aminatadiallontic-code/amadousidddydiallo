import { createServerFn } from "@tanstack/react-start";
import { contactEmailSchema, forwardContactEmail } from "@/lib/formsubmit";

export const notifyContactOwner = createServerFn({ method: "POST" })
  .validator((input: unknown) => contactEmailSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      return await forwardContactEmail(data);
    } catch {
      // Do not expose visitor details or prevent confirmation of a stored request.
      console.warn("Contact email relay unavailable; stored request retained.");
      return { accepted: false };
    }
  });
