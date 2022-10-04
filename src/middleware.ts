// Removing this file fixes issue

import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  // Redirect any non public file or api requests to default locale (us) for photowall.com
  // See https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === "default") {
    return NextResponse.redirect(
      new URL(`/us${req.nextUrl.pathname}`, req.url)
    );
  }
}
