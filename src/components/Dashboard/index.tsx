"use client";
import {
  Calendar,
  Users,
  UserCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const Dashboard = () => {
  const stats = [
    {
      title: "Total Appointments",
      value: "248",
      change: "+12.5%",
      trend: "up",
      icon: Calendar,
      color: "blue",
    },
    {
      title: "Active Doctors",
      value: "32",
      change: "+3",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      title: "Total Patients",
      value: "1,432",
      change: "+24",
      trend: "up",
      icon: UserCircle,
      color: "purple",
    },
    {
      title: "Pending Reviews",
      value: "18",
      change: "-5",
      trend: "down",
      icon: AlertCircle,
      color: "orange",
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      patientName: "John Smith",
      doctorName: "Dr. Sarah Wilson",
      time: "10:00 AM",
      date: "2026-02-20",
      status: "confirmed",
      type: "Consultation",
    },
    {
      id: 2,
      patientName: "Emma Johnson",
      doctorName: "Dr. Michael Brown",
      time: "11:30 AM",
      date: "2026-02-20",
      status: "pending",
      type: "Follow-up",
    },
    {
      id: 3,
      patientName: "Robert Davis",
      doctorName: "Dr. Sarah Wilson",
      time: "02:00 PM",
      date: "2026-02-20",
      status: "confirmed",
      type: "Check-up",
    },
    {
      id: 4,
      patientName: "Lisa Anderson",
      doctorName: "Dr. James Lee",
      time: "03:30 PM",
      date: "2026-02-20",
      status: "cancelled",
      type: "Consultation",
    },
    {
      id: 5,
      patientName: "Michael Wilson",
      doctorName: "Dr. Emily Chen",
      time: "04:00 PM",
      date: "2026-02-20",
      status: "confirmed",
      type: "Surgery Consultation",
    },
  ];

  const statusConfig = {
    confirmed: {
      label: "Confirmed",
      color: "text-green-700 bg-green-50 border-green-200",
      icon: CheckCircle,
    },
    pending: {
      label: "Pending",
      color: "text-orange-700 bg-orange-50 border-orange-200",
      icon: Clock,
    },
    cancelled: {
      label: "Cancelled",
      color: "text-red-700 bg-red-50 border-red-200",
      icon: XCircle,
    },
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Admin!
            </h1>
            <p className="text-gray-500 mt-1">
              ${`Here's what's happening with your appointments today.`}
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="text-right">
              <p className="text-sm text-gray-500">{`Today's Date`}</p>
              <p className="text-lg font-semibold text-gray-900">
                February 20, 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            purple: "bg-purple-100 text-purple-600",
            orange: "bg-orange-100 text-orange-600",
          };

          return (
            <Card
              key={stat.title}
              className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2 gap-1">
                    <TrendingUp
                      className={`h-4 w-4 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    />
                    <span
                      className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recent Appointments
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Latest appointment bookings and their status
              </p>
            </div>
            <Button variant="outline" className="border-gray-300">
              View All
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAppointments.map((appointment) => {
                const StatusIcon =
                  statusConfig[appointment.status as keyof typeof statusConfig]
                    .icon;
                const statusColor =
                  statusConfig[appointment.status as keyof typeof statusConfig]
                    .color;
                const statusLabel =
                  statusConfig[appointment.status as keyof typeof statusConfig]
                    .label;

                return (
                  <tr
                    key={appointment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {appointment.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: #{appointment.id.toString().padStart(4, "0")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.doctorName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.time}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor}`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule New Appointment
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-300"
            >
              <Users className="h-5 w-5 mr-2" />
              Add New Doctor
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-300"
            >
              <UserCircle className="h-5 w-5 mr-2" />
              Register Patient
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">
                  All Systems Operational
                </span>
              </div>
              <span className="text-xs text-gray-500">Just now</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">
                  Database Connected
                </span>
              </div>
              <span className="text-xs text-gray-500">2 min ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">
                  API Services Active
                </span>
              </div>
              <span className="text-xs text-gray-500">5 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
