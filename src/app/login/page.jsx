"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  User,
  Users,
  UserCog,
  ArrowRight,
  Eye,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState("student");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/dashboard/${userType}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-black" />
            <h1 className="text-2xl font-bold text-black">EduManage</h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-black hover:text-gray-600"
          >
            <span className="font-medium">View Page</span>
            <Eye className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="border border-gray-200 shadow-xl">
            <div className="h-1.5 bg-gradient-to-r from-black to-gray-700"></div>
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-black">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Login to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={userType}
                onValueChange={setUserType}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger
                    value="student"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Student</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="teacher"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2"
                  >
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline">Teacher</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2"
                  >
                    <UserCog className="h-4 w-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-700">
                      Username / ID
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-700">
                        Password
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-black hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black text-white shadow-md transition-all"
                  >
                    <span>Login</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Tabs>
            </CardContent>
            <CardFooter className="flex-col space-y-3 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/admission"
                  className="font-medium text-black hover:underline"
                >
                  Apply now
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                By logging in, you agree to our{" "}
                <Link href="#" className="text-black hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-black hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
