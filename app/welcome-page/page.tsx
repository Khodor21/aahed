import Image from "next/image";

export default function AuthWelcomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center py-10 text-center" dir="rtl">
      {/* Top Section: Logo */}
      <div className="w-full flex flex-col items-center pt-6">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={110}
          height={55}
          priority
          className="object-contain"
        />
      </div>

      {/* Middle Section: Welcome Text */}
      <div className="w-full max-w-md px-4 flex flex-col items-start text-right mt-auto mb-auto">
        <h1
          className="text-2xl font-light text-black leading-relaxed"
          style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
        >
          السلام عليكم ورحمة الله
        </h1>
        <h2 className="text-2xl font-serif text-main leading-relaxed">
          أهـلاً وسهلاً بك.
        </h2>
      </div>

      {/* Bottom Section: Buttons & Forgot Password */}
      <div className="w-full max-w-sm px-4 flex flex-col space-y-3 pb-8 mx-auto">
        <button className="w-full bg-black text-white py-2 px-4 rounded-xl font-normal text-base hover:opacity-95 transition-opacity">
          سجّل دخول
        </button>
        <button className="w-full bg-black text-white py-4 px-4 rounded-xl font-normal text-base hover:opacity-95 transition-opacity">
          أنشئ حساب
        </button>
        <div className="pt-2 text-center">
          <a href="#" className="text-sm font-normal text-black hover:underline">
            هل نسيت كلمة المرور؟
          </a>
        </div>
      </div>
    </main>
  );
}