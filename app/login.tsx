import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from '../context/AuthContext';
import "../global.css";
import { authService } from '../services/auth.service';

const API_URL = process.env.API_URL || "https://medai-purebackend.onrender.com";

export default function Login() {
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('./profile/dashboard');
        }
    }, [isAuthenticated]);

    const handleLogin = async () => {
        setError("");
        setSuccess(false);
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.login(email, password);
            if (response?.token) {
                await login(response.token, response.user);
                setSuccess(true);
                router.replace('./profile/dashboard');
            } else {
                setError("Login failed: invalid server response");
            }
        } catch (error: any) {
            console.error('Detailed error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            if (error.response) {
                // Handle specific error cases
                switch (error.response.status) {
                    case 401:
                        setError("Invalid email or password");
                        break;
                    case 404:
                        setError("Account not found");
                        break;
                    case 429:
                        setError("Too many attempts. Please try again later");
                        break;
                    default:
                        setError(error.response.data?.message || "An error occurred during login");
                }
            } else if (error.request) {
                setError("Network error. Please check your internet connection");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView enabled={true} behavior="padding" className="flex-1 bg-gray-100">
            <View className="flex-1 bg-gray-100">
                <View className="flex-1 items-center justify-center px-6 py-8">
                    {/* Header */}
                    <View className="items-center mb-8">
                        <View className="w-12 h-12 bg-blue-500 rounded-lg items-center justify-center">
                            <Ionicons name="heart-outline" size={26} color="white" />
                        </View>
                        <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</Text>
                        <Text className="text-gray-600 text-base">Sign in to your patient account</Text>
                    </View>

                    {/* Login Form Card */}
                    <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
                        {/* Success Message */}
                        {success ? (
                            <View className="mb-4 p-3 bg-green-100 rounded-lg">
                                <Text className="text-green-600 text-center">Login successful! Redirecting...</Text>
                            </View>
                        ) : null}

                        {/* Error Message */}
                        {error ? (
                            <View className="mb-4 p-3 bg-red-100 rounded-lg">
                                <Text className="text-red-600 text-center">{error}</Text>
                            </View>
                        ) : null}

                        {/* Email Input */}
                        <View className="mb-4">
                            <Text className="text-gray-700 font-medium mb-2">Email Address</Text>
                            <View className="relative">
                                <View className="absolute left-3 top-4 z-10">
                                    <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                                </View>
                                <TextInput
                                    className="border border-gray-300 rounded-xl px-12 py-4 text-gray-800"
                                    placeholder="Enter your email"
                                    placeholderTextColor="#9CA3AF"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View className="mb-4">
                            <Text className="text-gray-700 font-medium mb-2">Password</Text>
                            <View className="relative">
                                <View className="absolute left-3 top-4 z-10">
                                    <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
                                </View>
                                <TextInput
                                    className="border border-gray-300 rounded-xl px-12 py-4 pr-12 text-gray-800"
                                    placeholder="Enter your password"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    className="absolute right-3 top-4 z-10"
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#9CA3AF"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Remember Me & Forgot Password */}
                        <View className="flex-row justify-between items-center mb-6">
                            <TouchableOpacity
                                className="flex-row items-center"
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View className={`w-5 h-5 border-2 rounded mr-2 items-center justify-center ${rememberMe ? "bg-blue-600 border-blue-600" : "border-gray-300"
                                    }`}>
                                    {rememberMe && <Text className="text-white text-xs">✓</Text>}
                                </View>
                                <Text className="text-gray-600">Remember me</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text className="text-blue-600 font-medium">Forgot password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity
                            className={`py-4 rounded-xl mb-4 ${isLoading ? 'bg-blue-400' : 'bg-blue-600'}`}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <Text className="text-white font-semibold text-lg text-center">
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Text>
                        </TouchableOpacity>

                        {/* Sign Up Link */}
                        <TouchableOpacity
                            className="flex-row justify-center items-center"
                            onPress={() => router.push('/signup')}
                        >
                            <Text className="text-gray-600">Don't have an account? </Text>
                            <Text className="text-blue-600 font-semibold">Sign up here</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Back to Home */}
                    <TouchableOpacity
                        className="mt-6"
                        onPress={() => router.push('/')}
                    >
                        <Text className="text-blue-600 font-medium">← Back to Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

