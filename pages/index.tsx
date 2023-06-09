import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className="text-center flex items-center justify-center h-screen">
        <div>
          <p className="mb-5">Fetching APIs with Redux and Nextjs13</p>
          <Link href="pokemon/">
            <Button text="Pokemon" color={"yellow"} />
          </Link>
          <Link href="valorant/">
            <Button text="Valorant" color={"red"} />
          </Link>
          {/* <Link href="pt/">
            <Button text="Perguruan Tinggi" color={"blue"} />
          </Link> */}
        </div>
      </div>
    </div>
  );
}
