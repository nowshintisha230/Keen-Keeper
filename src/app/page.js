import Banner from "@/components/Home/Banner";
import Friends from "@/components/Home/Friends";
import Link from "next/link";


export default function Home() {
  return (
    <div className="">
    <Link href="/">
    <Banner></Banner>
      <Friends></Friends>
      </Link>
    </div>
  );
}
