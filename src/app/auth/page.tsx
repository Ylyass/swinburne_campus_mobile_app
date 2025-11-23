import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Role = "student" | "staff" | "admin";

/* -------- actions -------- */
async function signIn(formData: FormData) {
  "use server";
  const email = (formData.get("email") as string)?.trim();
  const campusId = (formData.get("campusId") as string)?.trim();

  const jar = await cookies(); // ✅ await
  const existing = jar.get("user")?.value;
  const user = existing
    ? JSON.parse(existing)
    : { name: email?.split("@")[0] || "Student", email, campusId, roles: ["student"] as Role[] };

  jar.set("user", JSON.stringify(user), {
    path: "/", sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, maxAge: 60 * 60 * 24 * 365,
  });
  jar.set("auth", "1", {
    path: "/", sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, maxAge: 60 * 60 * 24 * 365,
  });

  redirect("/profile");
}

async function register(formData: FormData) {
  "use server";
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const campusId = (formData.get("campusId") as string)?.trim();
  const role = ((formData.get("role") as string) || "student") as Role;

  const user = { name, email, campusId, roles: [role] as Role[] };

  const jar = await cookies(); // ✅ await
  jar.set("user", JSON.stringify(user), {
    path: "/", sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, maxAge: 60 * 60 * 24 * 365,
  });
  jar.set("auth", "1", {
    path: "/", sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, maxAge: 60 * 60 * 24 * 365,
  });

  redirect("/profile");
}

/* -------- page -------- */
export default function AuthPage() {
  return (
    <main className="maxw container-px my-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Sign in / Create account</h1>
        <p className="mt-1 text-slate-600 text-sm">
          Demo only — stores details in a cookie so Profile shows real values.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Register */}
          <form action={register} className="rounded-2xl border border-slate-200 p-4">
            <h2 className="font-semibold mb-3">Create account</h2>
            <label className="grid gap-1 mb-3 text-sm">
              <span className="text-slate-700">Full name</span>
              <input name="name" required className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </label>
            <label className="grid gap-1 mb-3 text-sm">
              <span className="text-slate-700">Email</span>
              <input type="email" name="email" required className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </label>
            <label className="grid gap-1 mb-3 text-sm">
              <span className="text-slate-700">Campus ID</span>
              <input name="campusId" placeholder="e.g., SWWK-102777885" required className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </label>
            <label className="grid gap-1 mb-4 text-sm">
              <span className="text-slate-700">Role</span>
              <select name="role" className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-white">Create account</button>
          </form>

          {/* Sign in */}
          <form action={signIn} className="rounded-2xl border border-slate-200 p-4">
            <h2 className="font-semibold mb-3">Sign in</h2>
            <label className="grid gap-1 mb-3 text-sm">
              <span className="text-slate-700">Email</span>
              <input type="email" name="email" required className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </label>
            <label className="grid gap-1 mb-4 text-sm">
              <span className="text-slate-700">Campus ID</span>
              <input name="campusId" required className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </label>
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-white">Sign in</button>
          </form>
        </div>
      </section>
    </main>
  );
}
