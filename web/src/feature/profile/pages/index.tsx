import React, { useState, useEffect } from 'react';
import { useProfileByUsername, useUpdateProfile } from '../hooks/useProfileHooks';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useUser } from '../../../hooks/useUser';

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   password: string;
//   role: 'clerk' | 'archivist' | 'admin';
//   createdAt: string;
//   updatedAt: string;
// }

interface AuditLogEntry {
  action: string;
  document: string;
  time: string;
}

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  
  // Fetch user data
  const { data: user, isLoading, isError, error } = useProfileByUsername(username || '');
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const {updateUser}= useUser()
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    role: 'clerk' as const
  });
  const [auditLogs] = useState<AuditLogEntry[]>([
    { action: 'Document Uploaded', document: 'Birth Certificate #12345', time: '2m ago' },
    { action: 'Record Created', document: 'Birth Certificate #12344', time: '1h ago' },
  ]);

  // Initialize edit form when user data is loaded
  useEffect(() => {
    if (user) {
      setEditForm({
        username: user.username,
        email: user.email,
        role: user.role
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    updateProfile({
      username: editForm.username,
      email: editForm.email,
      role: editForm.role
    }, {
      onSuccess: (data) => {
        updateUser(data)
        console.log('user',data);

        setIsEditOpen(false);
        navigate(`/profile/${data.username.trim()}`)
      }
    });
  };

  if (!username) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">Username is required</h1>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-64">
        <ClipLoader size={50} color="#2196F3" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error loading profile</h1>
        <p className="text-gray-600">{error?.message || 'Unknown error occurred'}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 relative min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
            <button 
              onClick={() => setIsEditOpen(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="border-b pb-3">
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-gray-800">{user.username}</p>
            </div>
            <div className="border-b pb-3">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div className="border-b pb-3">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-gray-800 capitalize">{user.role}</p>
            </div>
            <div className="border-b pb-3">
              <p className="text-sm text-gray-500">Joined</p>
              <p className="text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-gray-800">{new Date(user.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
          {auditLogs.length > 0 ? (
            <ul className="space-y-3">
              {auditLogs.map((log, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{log.action}</p>
                      <p className="text-sm text-gray-600">{log.document}</p>
                    </div>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent activities</p>
          )}
        </div>
      </div>

      {isEditOpen && (
        <div className="absolute inset-0  flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
              <button 
                onClick={() => setIsEditOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="clerk">Clerk</option>
                  <option value="archivist">Archivist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <ClipLoader size={20} color="#ffffff" className="mr-2" />
                      Saving...
                    </>
                  ) : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;