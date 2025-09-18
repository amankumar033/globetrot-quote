import { useState } from "react";
import { ArrowLeft, ArrowRight, Save, Users, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const QuotationBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    destination: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    adults: 2,
    children: 0,
    infants: 0
  });

  const steps = [
    { id: 1, title: "Basic Information", description: "Client and trip details" },
    { id: 2, title: "Package Selection", description: "Hotels, cars, meals & activities" },
    { id: 3, title: "Customization", description: "Pricing and terms" },
    { id: 4, title: "Preview & Export", description: "Final review and export" }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  placeholder="Enter client full name"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="client@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Trip Destination *</Label>
                <Select value={formData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="goa">Goa</SelectItem>
                    <SelectItem value="kerala">Kerala</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="himachal">Himachal Pradesh</SelectItem>
                    <SelectItem value="darjeeling">Darjeeling</SelectItem>
                    <SelectItem value="andaman">Andaman & Nicobar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => handleInputChange("startDate", date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => handleInputChange("endDate", date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Number of Travelers</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adults" className="text-sm">Adults (12+ years)</Label>
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    value={formData.adults}
                    onChange={(e) => handleInputChange("adults", parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="children" className="text-sm">Children (2-12 years)</Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    value={formData.children}
                    onChange={(e) => handleInputChange("children", parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="infants" className="text-sm">Infants (0-2 years)</Label>
                  <Input
                    id="infants"
                    type="number"
                    min="0"
                    value={formData.infants}
                    onChange={(e) => handleInputChange("infants", parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Package Selection
              </h3>
              <p className="text-muted-foreground">
                Hotel, car, meal, and activity selection will be implemented in the next iteration.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Customization & Pricing
              </h3>
              <p className="text-muted-foreground">
                Pricing calculations and customization options will be implemented in the next iteration.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Preview & Export
              </h3>
              <p className="text-muted-foreground">
                PDF preview and export functionality will be implemented in the next iteration.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/60 backdrop-blur-sm shadow-lg">
        <div className="flex h-18 items-center justify-between px-8">
          <div className="flex items-center space-x-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-8 w-px bg-border/50"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">Create New Quotation</h1>
          </div>
          <Button variant="outline" className="rounded-xl shadow-sm">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/30 shadow-lg">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center text-sm font-semibold shadow-md transition-all duration-300",
                        currentStep >= step.id
                          ? "bg-gradient-to-br from-primary to-primary-hover text-primary-foreground shadow-primary/20"
                          : "bg-muted/50 text-muted-foreground"
                      )}
                    >
                      {step.id}
                    </div>
                    <div className="ml-4">
                      <p className={cn(
                        "text-base font-semibold transition-colors duration-300",
                        currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {step.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "h-px w-24 ml-8 transition-colors duration-300",
                      currentStep > step.id ? "bg-gradient-to-r from-primary to-primary-hover" : "bg-muted/30"
                    )}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <Card className="mb-12 border-0 shadow-xl bg-card/60 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary-hover/5 border-b border-border/30 pb-8">
            <CardTitle className="flex items-center space-x-3 text-2xl font-semibold">
              {currentStep === 1 && <Users className="h-6 w-6 text-primary" />}
              {currentStep === 2 && <MapPin className="h-6 w-6 text-primary" />}
              {currentStep === 3 && <Phone className="h-6 w-6 text-primary" />}
              {currentStep === 4 && <Mail className="h-6 w-6 text-primary" />}
              <span className="text-foreground">{steps[currentStep - 1].title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-8 py-3 text-base rounded-xl shadow-md"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length}
            className="bg-gradient-primary px-8 py-3 text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {currentStep === steps.length ? "Generate Quotation" : "Next"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuotationBuilder;