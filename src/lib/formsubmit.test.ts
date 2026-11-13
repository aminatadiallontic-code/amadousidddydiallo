import { afterEach, describe, expect, it, vi } from "vitest";
import { forwardContactEmail } from "./formsubmit";

const contact = {
  name: "Test FormSubmit",
  email: "test@example.com",
  phone: "+224 600000000",
  request_type: "formation",
  message: "Je souhaite apprendre le montage vidéo.",
};

afterEach(() => vi.unstubAllGlobals());

describe("contact email relay", () => {
  it("forwards all contact details to the owner's fixed Gmail address", async () => {
    const mockFetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: "true" })));
    vi.stubGlobal("fetch", mockFetch);
    await expect(forwardContactEmail(contact)).resolves.toEqual({ accepted: true });
    expect(mockFetch.mock.calls[0]?.[0]).toBe("https://formsubmit.co/ajax/amadousiddyd0@gmail.com");
    const options = mockFetch.mock.calls[0]?.[1];
    expect(options.headers).toMatchObject({
      Origin: "https://amadousidddydiallo.lovable.app",
      Referer: "https://amadousidddydiallo.lovable.app/",
      "X-Requested-With": "XMLHttpRequest",
    });
    expect(JSON.parse(options.body)).toMatchObject({
      name: contact.name,
      email: contact.email,
      "Téléphone / WhatsApp": contact.phone,
      "Type de demande": "Formation",
      message: contact.message,
    });
  });

  it("rejects invalid visitor email before forwarding", async () => {
    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
    await expect(forwardContactEmail({ ...contact, email: "invalid" })).rejects.toThrow();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("does not report rejected relay requests as accepted", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }))),
    );
    await expect(forwardContactEmail(contact)).rejects.toThrow("FormSubmit did not accept");
  });
});
