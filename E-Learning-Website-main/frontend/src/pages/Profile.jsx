/**
 * Profile Page
 * User profile management and editing
 */

import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';

export default function ProfilePage() {
  const { auth, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: auth?.name || '',
    bio: auth?.bio || '',
    profilePhoto: auth?.profilePhoto || null,
  });
  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePhoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('Name cannot be empty');
      return;
    }

    updateProfile(formData.name, formData.bio, formData.profilePhoto);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          {/* Header */}
          <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">
              My Profile
            </h1>

            {!isEditing && (
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>

          {/* Profile Content */}
          <div className="space-y-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-6xl mb-4 overflow-hidden">
                {formData.profilePhoto ? (
                  <img
                    src={formData.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  '👤'
                )}
              </div>

              {isEditing && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Photo
                  </Button>
                </>
              )}
            </div>

            {/* Form Fields */}
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>

                <Input
                  label="Email"
                  value={auth?.email || ''}
                  disabled
                  className="bg-gray-100"
                />

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>

                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: auth?.name || '',
                        bio: auth?.bio || '',
                        profilePhoto: auth?.profilePhoto || null,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <p className="text-lg text-gray-900">
                    {auth?.name || 'Not set'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-lg text-gray-900">
                    {auth?.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <p className="text-lg text-gray-900 capitalize">
                    {auth?.role}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <p className="text-lg text-gray-900">
                    {auth?.bio || 'No bio added yet'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Since
                  </label>
                  <p className="text-lg text-gray-900">
                    {auth?.loginTime ? new Date(auth.loginTime).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
