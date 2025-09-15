import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Users, 
  Calendar, 
  MessageSquare, 
  Image as ImageIcon,
  Bell,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Star,
  Search
} from "lucide-react";

// Mock data
const mockUsers = [
  { id: 1, name: "John Smith", email: "john@university.edu", role: "student", status: "active", registrations: 5 },
  { id: 2, name: "Sarah Johnson", email: "sarah@university.edu", role: "organizer", status: "active", events: 3 },
  { id: 3, name: "Mike Wilson", email: "mike@university.edu", role: "student", status: "suspended", registrations: 2 },
];

const mockPendingEvents = [
  { id: 1, title: "Tech Innovation Summit", organizer: "Dr. Smith", category: "technical", submitted: "2024-01-15", status: "pending" },
  { id: 2, title: "Cultural Night 2024", organizer: "Prof. Johnson", category: "cultural", submitted: "2024-01-14", status: "pending" },
];

const mockReports = [
  { event: "TechFest 2024", participants: 250, satisfaction: 4.8, feedback_count: 89, completed: true },
  { event: "Cultural Harmony", participants: 180, satisfaction: 4.5, feedback_count: 67, completed: true },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveEvent = (eventId: number) => {
    console.log("Approving event:", eventId);
  };

  const handleRejectEvent = (eventId: number) => {
    console.log("Rejecting event:", eventId);
  };

  const handleSuspendUser = (userId: number) => {
    console.log("Suspending user:", userId);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Events</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{mockPendingEvents.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">23</div>
            <p className="text-xs text-muted-foreground">Currently live</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-accent" />
                <span className="text-sm">New event "AI Workshop" submitted by Dr. Wilson</span>
              </div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="h-4 w-4 text-success" />
                <span className="text-sm">45 new student registrations today</span>
              </div>
              <span className="text-xs text-muted-foreground">4 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEventManagement = () => (
    <Card className="border-0 shadow-card">
      <CardHeader>
        <CardTitle>Pending Event Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPendingEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-card-foreground">{event.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Organizer: {event.organizer} • Category: {event.category}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Submitted: {new Date(event.submitted).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-success border-success hover:bg-success hover:text-white"
                  onClick={() => handleApproveEvent(event.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-destructive border-destructive hover:bg-destructive hover:text-white"
                  onClick={() => handleRejectEvent(event.id)}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderUserManagement = () => (
    <Card className="border-0 shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Management</CardTitle>
        <div className="relative w-64">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-card-foreground">{user.name}</h4>
                  <Badge variant={user.role === 'student' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <Badge 
                    variant={user.status === 'active' ? 'default' : 'destructive'}
                    className={user.status === 'active' ? 'bg-success text-success-foreground' : ''}
                  >
                    {user.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {user.role === 'student' ? `${user.registrations} registrations` : `${user.events} events organized`}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className={user.status === 'active' ? 'text-destructive' : 'text-success'}
                  onClick={() => handleSuspendUser(user.id)}
                >
                  {user.status === 'active' ? 'Suspend' : 'Activate'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderReportsAnalytics = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Event Reports & Analytics</CardTitle>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-card-foreground">{report.event}</h4>
                  <Badge className="bg-success text-success-foreground">Completed</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{report.participants}</div>
                    <div className="text-xs text-muted-foreground">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      <span className="text-2xl font-bold text-warning">{report.satisfaction}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{report.feedback_count}</div>
                    <div className="text-xs text-muted-foreground">Feedback</div>
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="w-full">
                  View Detailed Report
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCommunication = () => (
    <Card className="border-0 shadow-card">
      <CardHeader>
        <CardTitle>Send Announcement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Target Audience</label>
            <select className="w-full p-2 border border-border rounded-md bg-background">
              <option>All Users</option>
              <option>Students Only</option>
              <option>Organizers Only</option>
              <option>Active Event Participants</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <Input placeholder="Enter announcement subject" />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <textarea 
              className="w-full p-3 border border-border rounded-md bg-background min-h-32"
              placeholder="Enter your announcement message..."
            />
          </div>
          
          <div className="flex space-x-2">
            <Button className="flex-1">
              <Bell className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
            <Button variant="outline">Preview</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-nav text-nav-foreground border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-nav-foreground/80">EventSphere Administration</p>
              </div>
            </div>
            <Button variant="outline" className="border-nav-foreground/20 text-nav-foreground hover:bg-nav-foreground/10">
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'events', label: 'Event Management', icon: Calendar },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
              { id: 'communication', label: 'Communication', icon: Bell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'events' && renderEventManagement()}
        {activeTab === 'users' && renderUserManagement()}
        {activeTab === 'reports' && renderReportsAnalytics()}
        {activeTab === 'communication' && renderCommunication()}
      </div>
    </div>
  );
};

export default AdminDashboard;