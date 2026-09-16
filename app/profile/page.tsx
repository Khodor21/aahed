import { notFound } from "next/navigation";
import { getStudentById } from "@/lib/server/studentStore";
import ProfileClient from "./components/ProfileClient";

export default async function ProfilePage() {
  const student = await getStudentById("std-1");

  if (!student) {
    notFound();
  }

  return <ProfileClient student={student} />;
}
