import Image from "next/image";
import Link from "next/link";

export default function AuthWelcomePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center py-10 text-center"
      dir="rtl"
    >
      {/* Top Section: Logo */}
      <div className="w-full flex flex-col items-center pt-6">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={85}
          height={55}
          priority
          className="object-contain"
        />
      </div>

      {/* Middle Section: Welcome Text */}
      <div className="w-full flex flex-col items-center text-center mt-auto mb-auto">
        <h1
          className="text-2xl font-light text-black"
          style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
        >
          السلام عليكم ورحمة الله
        </h1>
        <h2
          style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
          className="text-4xl font-serif text-main"
        >
          أهـــلاً وسهـلاً بك.{" "}
        </h2>
      </div>

      {/* Bottom Section: Buttons & Forgot Password */}
      <div className="w-full max-w-sm flex flex-col space-y-2 mx-auto px-4">
        <Link
          href="/login"
          className="w-full text-sm bg-black text-white py-1 rounded-md font-normal hover:opacity-95 transition-opacity"
        >
          سجّل دخول
        </Link>
        <button className="w-full bg-black text-sm text-white py-1 rounded-md font-normal hover:opacity-95 transition-opacity">
          أنشئ حساب
        </button>
        <div className="pt-2 text-center">
          <Link
            href="/forgot-password"
            className="text-sm font-normal text-black hover:underline"
          >
            هل نسيت كلمة المرور؟
          </Link>
        </div>
      </div>
    </main>
  );
}
