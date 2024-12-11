import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-red-500 bg-blue-200 p-2">
        Hello World
      </h1>
      <Button variant="link" className="mt-4">
        Click me
      </Button>
    </div>
  );
}
