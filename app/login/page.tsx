"use client";

import Image from "next/image";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen flex flex-col items-center py-10" dir="rtl">
      {/* Logo */}
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

      {/* Welcome Text */}
      <div className="w-full max-w-sm px-4 text-right mt-auto mb-6">
        <h1
          className="text-2xl font-light text-black leading-relaxed"
          style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
        >
          مرحباً بعودتـك، اشتقنا 👀
        </h1>
        <p className="text-sm font-light text-black mt-1 leading-relaxed">
          سجّـــــــل دخول{" "}
          <span className="text-main font-normal">وتابع رحلتك</span>{" "}
          في مشروع عهد
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm px-4 flex flex-col space-y-5">
        {/* Username */}
        <div className="flex flex-col items-end space-y-2">
          <label className="text-sm font-light text-black">اسم المستخدم</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-lightgrey rounded-xl px-4 py-4 text-right text-black font-light text-base outline-none border-none"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col items-end space-y-2">
          <label className="text-sm font-light text-black">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-lightgrey rounded-xl px-4 py-4 text-right text-black font-light text-base outline-none border-none"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right pt-1">
          <span className="text-sm font-light text-black">نسيت كلمة المرور؟ </span>
          <a href="#" className="text-sm font-normal text-main hover:underline">
            اضغط هنا
          </a>
        </div>

        {/* Login Button */}
        <button className="w-full bg-black text-white py-4 px-4 rounded-xl font-normal text-base hover:opacity-95 transition-opacity">
          سجّل دخول
        </button>

        {/* Divider */}
        <div className="text-center text-sm font-light text-black">
          أو
        </div>

        {/* Create Account Button */}
        <button className="w-full bg-white text-black py-4 px-4 rounded-xl font-normal text-base border border-lightgrey hover:opacity-95 transition-opacity">
          أنشئ حساب
        </button>
      </div>

      <div className="mt-auto" />
    </main>
  );
}