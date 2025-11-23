"use client";

import Link from "next/link";
import AppearanceClient from "@/components/AppearanceClient";
import { Card, Segment, LinkHref, ServiceLinks } from "./ProfileUI";

type ThemePref = "system" | "light" | "dark";

export default function ProfileGuest({
  guestTheme, setGuestTheme, guestLang, setGuestLang,
}: {
  guestTheme: ThemePref; setGuestTheme: (v: ThemePref) => void;
  guestLang: string; setGuestLang: (v: string) => void;
}) {
  return (
    <div className="maxw container-px my-6">
      <AppearanceClient themePref={guestTheme} />
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="p-5 sm:p-7">
          <h1 className="text-xl font-semibold">Welcome</h1>
          <p className="mt-1 text-slate-600">
            Sign in for a personalized experience, or continue as a guest and we’ll keep your basic preferences on this device.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link href="/auth" className="grid place-items-center rounded-xl bg-slate-900 px-4 py-2 text-white">
              Sign in / Create account
            </Link>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2" onClick={() => alert("Continuing as guest. These prefs are saved locally.")}>
              Continue as guest
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card title="Language & theme">
              <div className="grid gap-2">
                <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={guestLang} onChange={(e) => setGuestLang(e.target.value)}>
                  <option>English</option><option>Bahasa Melayu</option><option>中文</option>
                </select>
                <Segment<ThemePref>
                  value={guestTheme}
                  onChange={setGuestTheme}
                  options={[{ value: "system", label: "System" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
                />
              </div>
            </Card>

            <Card title="Link services"><ServiceLinks /></Card>

            <Card title="About & Help">
              <div className="grid gap-2">
                <LinkHref href="/support" label="Help center" />
                <LinkHref href="/support" label="Chat with support" />
                <LinkHref href="/privacy" label="Privacy & terms" />
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
