import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
}

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  id_number?: string;
  role: 'visitor' | 'student' | 'organizer';
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('mockUser');
    const storedProfile = localStorage.getItem('mockProfile');
    
    if (storedUser && storedProfile) {
      setUser(JSON.parse(storedUser));
      setProfile(JSON.parse(storedProfile));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock login - accept any email/password
    const mockUser: User = {
      id: `user_${Date.now()}`,
      email: email,
    };
    
    const mockProfile: Profile = {
      id: `profile_${Date.now()}`,
      user_id: mockUser.id,
      full_name: email.split('@')[0].replace(/[^a-zA-Z\s]/g, ''),
      role: email.includes('organizer') ? 'organizer' : 'student',
      id_number: `${Math.floor(Math.random() * 10000)}`,
    };

    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    localStorage.setItem('mockProfile', JSON.stringify(mockProfile));
    
    setUser(mockUser);
    setProfile(mockProfile);
    
    // Navigate to appropriate dashboard based on role
    if (mockProfile.role === 'student') {
      navigate('/student/dashboard');
    } else if (mockProfile.role === 'organizer') {
      navigate('/organizer/dashboard');
    } else {
      navigate('/');
    }
    
    return { error: null };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const mockUser: User = {
      id: `user_${Date.now()}`,
      email: email,
    };
    
    const mockProfile: Profile = {
      id: `profile_${Date.now()}`,
      user_id: mockUser.id,
      full_name: userData.fullName,
      role: userData.role,
      id_number: userData.idNumber,
    };

    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    localStorage.setItem('mockProfile', JSON.stringify(mockProfile));
    
    setUser(mockUser);
    setProfile(mockProfile);
    
    // Navigate to appropriate dashboard based on role
    if (mockProfile.role === 'student') {
      navigate('/student/dashboard');
    } else if (mockProfile.role === 'organizer') {
      navigate('/organizer/dashboard');
    } else {
      navigate('/');
    }
    
    return { error: null };
  };

  const signOut = async () => {
    localStorage.removeItem('mockUser');
    localStorage.removeItem('mockProfile');
    setUser(null);
    setProfile(null);
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}