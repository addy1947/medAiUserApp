import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import "../global.css";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">Preparing your experience...</Text>
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="./profile/dashboard" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center min-h-screen px-6 py-8">
        {/* Main Card */}
        <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          {/* Header */}
          <View className="flex-row justify-between items-start mb-4 content-center">
            <View className="w-12 h-12 bg-teal-600 rounded-lg items-center justify-center">
              <Ionicons name="heart-outline" size={24} color="white" />
            </View>
          </View>

          <Text className="text-2xl font-bold text-gray-800 mb-2">MedAI</Text>
          <Text className="text-blue-600 text-base mb-4">Your intelligent healthcare companion</Text>

          <Text className="text-gray-600 text-sm leading-6 mb-6">
            Access your medical records, get AI-powered health insights, and manage your healthcare journey with complete control.
          </Text>

          <Text className="text-lg font-bold text-gray-800 mb-4">Portal Features:</Text>

          <View className="space-y-3 mb-6">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded items-center justify-center mr-3">
                <MaterialCommunityIcons name="lightbulb-on-90" size={22} color="black" />
              </View>
              <Text className="text-gray-700 flex-1">AI Health Assistant</Text>
            </View>

            {/* Additional features... */}
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded items-center justify-center mr-3">
                <Ionicons name="document-text" size={20} color="black" />
              </View>
              <Text className="text-gray-700 flex-1">Digital Health Records</Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded items-center justify-center mr-3">
                <AntDesign name="schedule" size={20} color="black" />
              </View>
              <Text className="text-gray-700 flex-1">Smart Scheduling</Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded items-center justify-center mr-3">
                <FontAwesome5 name="hand-holding-medical" size={20} color="black" />
              </View>
              <Text className="text-gray-700 flex-1">Medication Reminders</Text>
            </View>
          </View>

          <View className="border-t border-gray-200 mb-4" />

          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-gray-500 text-sm">Platform Usage</Text>
            <Text className="text-gray-800 font-bold">50,000+ Patients</Text>
          </View>

          <TouchableOpacity
            className="bg-teal-600 py-4 rounded-xl flex-row items-center justify-center mb-4"
            onPress={() => router.push('/login')}
          >
            <Text className="text-white font-semibold text-lg mr-2">Access Patients Portal</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-center items-center"
            onPress={() => router.push('/signup')}
          >
            <Text className="text-gray-600">Don't have an account? </Text>
            <Text className="text-blue-600 font-semibold">Sign up here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

