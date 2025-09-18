import { useState } from "react";
import { 
  Search, 
  Bell, 
  User, 
  Plus, 
  Car, 
  UtensilsCrossed, 
  MapPin, 
  Hotel,
  TrendingUp,
  TrendingDown,
  Eye,
  Copy,
  Edit,
  MoreHorizontal,
  Calendar,
  IndianRupee,
  Users,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const summaryCards = [
    {
      title: "Total Quotations Sent",
      value: "42",
      trend: "+12%",
      trendDirection: "up",
      icon: FileText,
      color: "primary"
    },
    {
      title: "Conversion Rate",
      value: "68%",
      subtitle: "14 won / 28 sent",
      trend: "+5%",
      trendDirection: "up",
      icon: TrendingUp,
      color: "success"
    },
    {
      title: "Active Clients",
      value: "28",
      subtitle: "+3 new today",
      trend: "+3",
      trendDirection: "up",
      icon: Users,
      color: "warning"
    },
    {
      title: "Revenue Estimate",
      value: "₹2,48,500",
      subtitle: "from won quotations",
      trend: "+18%",
      trendDirection: "up",
      icon: IndianRupee,
      color: "primary"
    }
  ];

  const recentQuotations = [
    {
      id: 1,
      clientName: "Rajesh Kumar",
      destination: "Goa",
      date: "12 Nov 2023",
      amount: "₹24,800",
      status: "Won",
      statusColor: "success"
    },
    {
      id: 2,
      clientName: "Meera Singh",
      destination: "Darjeeling",
      date: "10 Nov 2023",
      amount: "₹18,500",
      status: "Pending",
      statusColor: "warning"
    },
    {
      id: 3,
      clientName: "Arun Patel",
      destination: "Kerala",
      date: "08 Nov 2023",
      amount: "₹32,400",
      status: "Sent",
      statusColor: "primary"
    },
    {
      id: 4,
      clientName: "Sunita Iyer",
      destination: "Rajasthan",
      date: "05 Nov 2023",
      amount: "₹41,200",
      status: "Lost",
      statusColor: "destructive"
    },
    {
      id: 5,
      clientName: "Vikram Malhotra",
      destination: "Shimla",
      date: "02 Nov 2023",
      amount: "₹15,700",
      status: "Won",
      statusColor: "success"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      description: "New quotation created for Rajesh Kumar",
      time: "2 hours ago",
      type: "quotation"
    },
    {
      id: 2,
      description: "Quotation marked as Won",
      time: "yesterday",
      type: "status"
    },
    {
      id: 3,
      description: "New client added",
      time: "2 days ago",
      type: "client"
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    const statusColors: Record<string, string> = {
      Won: "success",
      Pending: "warning",
      Sent: "primary", 
      Lost: "destructive"
    };
    return statusColors[status] || "secondary";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">TravelQuote Pro</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search quotations, clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryCards.map((card, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {card.value}
                  </div>
                  {card.subtitle && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {card.subtitle}
                    </p>
                  )}
                  <div className="flex items-center text-xs">
                    {card.trendDirection === "up" ? (
                      <TrendingUp className="h-3 w-3 text-success mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                    )}
                    <span className={card.trendDirection === "up" ? "text-success" : "text-destructive"}>
                      {card.trend}
                    </span>
                    <span className="text-muted-foreground ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Link to="/quotation">
                  <Button className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Quotation
                  </Button>
                </Link>
                <Button variant="outline">
                  <Hotel className="h-4 w-4 mr-2" />
                  Add Hotel
                </Button>
                <Button variant="outline">
                  <Car className="h-4 w-4 mr-2" />
                  Add Car
                </Button>
                <Button variant="outline">
                  <UtensilsCrossed className="h-4 w-4 mr-2" />
                  Add Meal
                </Button>
                <Button variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Quotations Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Quotations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Client Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Destination
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentQuotations.map((quotation) => (
                      <tr key={quotation.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">
                          {quotation.clientName}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {quotation.destination}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {quotation.date}
                        </td>
                        <td className="py-3 px-4 font-medium">
                          {quotation.amount}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={getStatusBadgeVariant(quotation.status) as any}>
                            {quotation.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Mark as Won</DropdownMenuItem>
                                <DropdownMenuItem>Mark as Lost</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 border-l bg-card p-6">
          {/* Status Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-sm">Quotation Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-success"></div>
                    <span className="text-sm">Won</span>
                  </div>
                  <span className="text-sm font-medium">14</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-warning"></div>
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="text-sm">Sent</span>
                  </div>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-destructive"></div>
                    <span className="text-sm">Lost</span>
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;