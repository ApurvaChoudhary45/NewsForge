'use client'
import Welcome from "@/components/Welcome";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import Mainpage from "@/components/Mainpage";
import Post from "@/components/Post";

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
      <Mainpage />
      <Post/>
      </>
    )
  }
  return (
    <>
      <Welcome />
    </>
  );
}
