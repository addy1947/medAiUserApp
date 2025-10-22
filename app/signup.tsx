import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from '../context/AuthContext';
import "../global.css";

export default function Signup() {
  const router = useRouter();
  const { signup, signupError, isSigningUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    phone: '',
    healthId: '',
    emergencyName: '',
    emergencyPhone: '',
    relationship: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    try {
      const signupData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        gender: formData.gender,
        phone: formData.phone,
        healthId: formData.healthId,
        emergencyContact: {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
          relationship: formData.relationship,
        }
      };

      await signup(signupData, formData.confirmPassword, agreeTerms);
      setSuccess(true);
      setTimeout(() => {
        router.replace('./profile/dashboard');
      }, 1000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView enabled={true} behavior="padding" keyboardVerticalOffset={100} className="flex-1 ">
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center min-h-screen px-6 py-8">
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-12 h-12 bg-blue-500 rounded-lg items-center justify-center">
            <Ionicons name="heart-outline" size={26} color="white" />
          </View>
          <Text className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</Text>
          <Text className="text-gray-600 text-base text-center">
            Join MedAI to access your personalized healthcare dashboard
          </Text>
        </View>

        {/* Signup Form Card */}
        <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          {/* Personal Information Section */}
          <Text className="text-lg font-bold text-gray-800 mb-4">Personal Information</Text>

          {/* Form Fields */}
          {/* Full Name Input */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
            <View className="relative">
              <View className="absolute left-3 top-4 z-10">
                <Ionicons name="person-outline" size={20} color="#9CA3AF" />
              </View>
              <TextInput
                className="border border-gray-300 rounded-xl px-12 py-4 text-gray-800"
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={formData.fullName}
                onChangeText={(value) => updateFormData('fullName', value)}
              />
            </View>
          </View>

          {/* Email */}
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
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Password</Text>
            <View className="relative">
              <View className="absolute left-3 top-4 z-10">
                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              </View>
              <TextInput
                className="border border-gray-300 rounded-xl px-12 py-4 pr-12 text-gray-800"
                placeholder="Create a strong password"
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
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

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-2">Confirm Password</Text>
            <View className="relative">
              <View className="absolute left-3 top-4 z-10">
                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              </View>
              <TextInput
                className="border border-gray-300 rounded-xl px-12 py-4 pr-12 text-gray-800"
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                className="absolute right-3 top-4 z-10"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Basic Details Section */}
          <Text className="text-lg font-bold text-gray-800 mb-4">Basic Details</Text>

          {/* Age */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Age</Text>
            <View className="relative">
              <View className="absolute left-3 top-4 z-10">
                <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
              </View>
              <TextInput
                className="border border-gray-300 rounded-xl px-12 py-4 text-gray-800"
                placeholder="Age"
                placeholderTextColor="#9CA3AF"
                value={formData.age}
                onChangeText={(value) => updateFormData('age', value)}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Gender */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Gender</Text>
            <View className="relative">
              <View className="absolute left-3 top-4 z-10">
                <Ionicons name="person-circle-outline" size={20} color="#9CA3AF" />
              </View>
              <Picker
                selectedValue={formData.gender}
                style={{ height: 56, marginLeft: 36, marginRight: 16, color: '#374151' }}
                onValueChange={(value) => updateFormData('gender', value)}
              >
                <Picker.Item label="Select gender" value="" color="#9CA3AF" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>

          {/* Phone Number */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Phone Number</Text>
            <View className="relative">
              <View className="absolute left-3 top-4 z-10">
                <Ionicons name="call-outline" size={20} color="#9CA3AF" />
              </View>
              <TextInput
                className="border border-gray-300 rounded-xl px-12 py-4 text-gray-800"
                placeholder="10-digit phone number"
                placeholderTextColor="#9CA3AF"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Health ID */}
          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-2">
              Health ID <Text className="text-gray-500">(Optional)</Text>
            </Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-4 text-gray-800"
              placeholder="Enter your health ID if available"
              placeholderTextColor="#9CA3AF"
              value={formData.healthId}
              onChangeText={(value) => updateFormData('healthId', value)}
            />
          </View>

          {/* Emergency Contact Section */}
          <Text className="text-lg font-bold text-gray-800 mb-4">Emergency Contact</Text>

          {/* Emergency Contact Name */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Contact Name</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-4 text-gray-800"
              placeholder="Emergency contact name"
              placeholderTextColor="#9CA3AF"
              value={formData.emergencyName}
              onChangeText={(value) => updateFormData('emergencyName', value)}
            />
          </View>

          {/* Emergency Contact Phone */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Contact Phone</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-4 text-gray-800"
              placeholder="Emergency contact phone"
              placeholderTextColor="#9CA3AF"
              value={formData.emergencyPhone}
              onChangeText={(value) => updateFormData('emergencyPhone', value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Relationship */}
          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-2">Relationship</Text>
            <View className="relative">
              <View className="absolute left-3 top-4 z-10">
                <Ionicons name="people-outline" size={20} color="#9CA3AF" />
              </View>
              <Picker
                selectedValue={formData.relationship}
                style={{ height: 56, marginLeft: 36, marginRight: 16, color: '#374151' }}
                onValueChange={(value) => updateFormData('relationship', value)}
              >
                <Picker.Item label="Select relationship" value="" color="#9CA3AF" />
                <Picker.Item label="Spouse" value="Spouse" />
                <Picker.Item label="Parent" value="Parent" />
                <Picker.Item label="Child" value="Child" />
                <Picker.Item label="Sibling" value="Sibling" />
                <Picker.Item label="Friend" value="Friend" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>

          {/* Terms and Privacy */}
          <TouchableOpacity
            className="flex-row items-start mb-6"
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <View className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
              agreeTerms ? "bg-blue-600 border-blue-600" : "border-gray-300"
            }`}>
              {agreeTerms && <Text className="text-white text-xs">✓</Text>}
            </View>
            <View className="flex-1">
              <Text className="text-gray-600 text-sm leading-5">
                I agree to the{" "}
                <Text className="text-blue-600 underline">Terms of Service</Text>
                {" "}and{" "}
                <Text className="text-blue-600 underline">Privacy Policy</Text>
              </Text>
            </View>
          </TouchableOpacity>

          {/* Success and Error Messages */}
          {success && (
            <View className="mb-4 p-3 bg-green-100 rounded-lg">
              <Text className="text-green-600 text-center">Account created successfully!</Text>
            </View>
          )}
          {error && (
            <View className="mb-4 p-3 bg-red-100 rounded-lg">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          )}

          {/* Create Account Button */}
          <TouchableOpacity 
            className={`py-4 rounded-xl mb-4 ${isLoading || !agreeTerms ? 'bg-blue-400' : 'bg-blue-600'}`}
            onPress={handleSignup}
            disabled={isLoading || !agreeTerms}
          >
            <Text className="text-white font-semibold text-lg text-center">
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <TouchableOpacity
            className="flex-row justify-center items-center"
            onPress={() => router.push('/login')}
          >
            <Text className="text-gray-600">Already have an account? </Text>
            <Text className="text-blue-600 font-semibold">Sign in here</Text>
          </TouchableOpacity>
        </View>

        {/* Back to Home */}
        <TouchableOpacity
          className="mt-6 mb-8"
          onPress={() => router.push('/')}
        >
          <Text className="text-blue-600 font-medium">← Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
       