# Payment success and remaining dark UI review

## User-facing outcomes
- Make the post-payment confirmation page match the teal-and-warm storefront, work cleanly on phones, and show success only after verifying the order.
- Keep the setup video where it helps most: beside the download/setup steps, with a clear poster and sensible loading behavior.
- Audit the separate AeroFuel, fraud-detection, and code-compiler demos and bring their surrounding customer-facing UI into the storefront theme while preserving dark code/editor areas where useful.
- Keep the existing no-generated-images constraint.

## Implementation
1. Trace the current checkout, payment verification, confirmation email, order status, and download-limit behavior. Avoid changing payment rules or exposing customer data.
2. Update the success page to avoid a duplicate logo under shared navigation, correct narrow-screen layout, show only verified order details, and make download-expiry/count language accurate. Preserve purchased add-ons on return links where source data supports it.
3. Keep the existing video on the success page near download instructions; verify the supplied video and poster render, and ensure it does not dominate the phone flow.
4. Review each named demo's page shell and styles. Replace outdated dark outer surfaces with the established light/teal styling, retaining only intentionally dark editor or code-preview surfaces.
5. Run type checks and inspect the success route and demo pages in desktop and mobile previews. Note any payment/email checks that cannot be completed without configured service credentials or a real paid order.

## Technical details
- Use the existing Next.js App Router, design tokens, and established order APIs; do not add a second router or new generated imagery.
- Keep privileged order reads server-side and return only fields needed for the confirmation screen.
