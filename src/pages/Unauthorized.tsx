import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Home } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-md text-center py-8 px-6 shadow-lg border-red-500/20 dark:border-red-500/10">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <Lock className="w-16 h-16 text-red-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-red-600 dark:text-red-400">
            Access Denied
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            You do not have the required permissions to view this page.
            <br />
            Please contact an administrator for assistance.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <Button asChild className="w-full flex items-center space-x-2">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" /> Go to Home Page
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;