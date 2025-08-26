// src/pages/dashboard/ProfilePage.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import PersonalInfoForm from "./PersonalInfoForm";
import PasswordChangeForm from "./PasswordChangeForm";

const ProfilePage = () => {
    const { data: userData, isLoading } = useUserInfoQuery(undefined);

    // Render Skeleton while loading
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full p-4">
                <Skeleton className="w-full max-w-2xl h-[400px] rounded-lg" />
            </div>
        );
    }

    const user = userData?.data;

    if (!user) {
        return (
            <div className="text-center p-8 text-red-500">
                Error: User data could not be loaded.
            </div>
        );
    }

    console.log("user data fetched:", user);

    return (
        <div className="p-6">
            <div className="flex flex-col items-center justify-center mb-8">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarFallback className="text-4xl">
                        {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>

            <div className="flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>My Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="personalInfo" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="personalInfo">Personal Information</TabsTrigger>
                                <TabsTrigger value="passwordChange">Change Password</TabsTrigger>
                            </TabsList>
                            <TabsContent value="personalInfo">
                                {/* Ensure user object is passed as initialData */}
                                <PersonalInfoForm initialData={user} />
                            </TabsContent>
                            <TabsContent value="passwordChange">
                                <PasswordChangeForm />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
