// src/pages/ErrorPage.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

  function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'An unknown error occurred';
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-lg text-center p-6 shadow-xl">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-red-600">Oops!</CardTitle>
          <CardDescription className="text-xl text-gray-700 mt-4">
            {isRouteErrorResponse(error) ? error.status : 'Something went wrong.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium text-gray-600">
            {errorMessage}
          </p>
          <p className="text-sm text-gray-500">
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button className="mt-6 w-full">Go Back to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default ErrorPage


