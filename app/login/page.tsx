"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Emoji } from "emoji-picker-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen flex flex-col items-center py-10" dir="rtl">
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

      {/* Welcome Text */}
      <div className="w-full max-w-sm px-4 text-center mt-4 mb-6">
        <h1
          className="text-2xl font-light text-black flex items-center justify-center text-center gap-1"
          style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
        >
          <span>مرحباً بعودتـك، اشتقنا</span>
          <Emoji unified="1f440" size={24} />
        </h1>
        <p className="text-sm font-light text-black mt-1">
          سجّـــــــل دخول{" "}
          <span className="text-main font-normal">وتابع رحلتك</span> في مشروع
          عهد
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm px-4 flex flex-col space-y-4 mx-auto">
        {/* Username */}
        <div className="flex flex-col items-start space-y-2">
          <label className="text-xs font-light text-black">اسم المستخدم</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col items-start space-y-2">
          <label className="text-xs font-light text-black">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-center pt-2">
          <span className="text-sm font-normal text-black">
            نسيت كلمة المرور؟{" "}
          </span>
          <Link
            href="/forgot-password"
            className="text-sm font-normal underline text-main hover:underline"
          >
            اضغط هنا
          </Link>
        </div>

        <div className="flex flex-col space-y-3">
          <button className="btn-primary">سجّل دخول</button>

          <div className="text-center text-sm font-light text-black">أو</div>

          <Link href="/register" className="btn-secondary">
            أنشئ حساب
          </Link>
        </div>
      </div>

      <div className="mt-auto" />
    </main>
  );
}
