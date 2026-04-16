import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/useUser';
import Sidebar from '@/components/Sidebar';
import TitleBar from '@/components/TitleBar';
import UserCard from '@/components/UserCard';

interface UserData {
    _id: string;
    fullName: string;
    admin: boolean;
}

export default function AdminUsersPage() {
    const router = useRouter();
    const { user } = useUser();
    const [users, setUsers] = useState<UserData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchAllUsers() {
            try {
                const authResponse = await fetch('/api/user/me');
                if (!authResponse.ok) {
                    router.push('/');
                    return; 
                }
                
                const parsedUser = await authResponse.json();
                
                const response = await fetch('/api/admin/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-id': parsedUser.id || parsedUser._id || ''
                    }
                });
                
                const data = await response.json();
                if (response.ok) {
                    setUsers(data);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError("A network error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    // Only ONE closing bracket here now!
    }, [router]);

    const filteredUsers = users.filter((u) =>
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            <div className="w-full shrink-0 z-20">
                <TitleBar 
                    showSearch={true}
                    onSearch={(query) => setSearchQuery(query)}
                />
            </div>

            <div className="flex flex-1 overflow-hidden w-full">
                <Sidebar />
                
                <main className="flex-1 overflow-y-auto bg-white border-t border-gray-200">
                    <div className="w-full border-b border-gray-200 px-8 pt-8 pb-4">
                        <h2 className="text-xl font-bold text-gray-500 text-left">
                            All users
                        </h2>
                    </div>
                    
                    <div className="max-w-[1300px] mx-auto p-8">
                        {loading && <p className="text-gray-500 font-medium text-lg">Loading users...</p>}
                        {error && <p className="text-[#D21312] font-bold text-lg">{error}</p>}

                        {!loading && !error && (
                            <div className="flex flex-wrap justify-center gap-6">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((u) => (
                                        <UserCard 
                                            key={u._id}
                                            fullName={u.fullName}
                                            isAdmin={u.admin}
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-lg w-full text-center">
                                        No users found matching "{searchQuery}".
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}