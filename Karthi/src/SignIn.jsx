import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[400px] rounded-xl shadow-lg">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">Sign In</h1>
          <Input placeholder="Enter your email" />
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg">
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}



