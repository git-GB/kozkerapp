"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, ArrowLeft, ArrowRight, Loader2, CheckCircle, XCircle, Edit } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import jsPDF from "jspdf"
import "jspdf-autotable"

interface LineItem {
  id: string
  item: string
  description: string
  quantity: number
  price: number
}

interface InvoiceData {
  // Company info
  companyName: string
  companyEmail: string
  companyAddress: string
  companyCity: string
  companyZip: string
  companyCountry: string
  companyState: string

  // Customer info
  customerName: string
  customerEmail: string
  customerAddress: string
  customerCity: string
  customerZip: string
  customerCountry: string
  customerState: string
  invoiceNumber: string
  invoiceDate: string

  // Items
  lineItems: LineItem[]
  notes: string
  taxRate: number
  currency: string
}

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
]

const countries = [
  "United States",
  "India",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "Mexico",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
]

const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

const indianStates = [
  // States
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

export default function InvoiceGenerator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [webhookResponse, setWebhookResponse] = useState<any>(null)
  const [isEditingTax, setIsEditingTax] = useState(false)
  const [showInvoicePreview, setShowInvoicePreview] = useState(false)

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    companyName: "",
    companyEmail: "",
    companyAddress: "",
    companyCity: "",
    companyZip: "",
    companyCountry: "United States",
    companyState: "",
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    customerCity: "",
    customerZip: "",
    customerCountry: "United States",
    customerState: "",
    invoiceNumber: "01",
    invoiceDate: new Date().toISOString().split("T")[0],
    lineItems: [{ id: "1", item: "", description: "", quantity: 1, price: 0 }],
    notes: "",
    taxRate: 13,
    currency: "USD",
  })

  const updateInvoiceData = (field: keyof InvoiceData, value: any) => {
    setInvoiceData((prev) => {
      const updated = { ...prev, [field]: value }
      // Reset state when country changes
      if (field === "companyCountry") {
        updated.companyState = ""
      }
      if (field === "customerCountry") {
        updated.customerState = ""
      }
      return updated
    })
  }

  const getStatesForCountry = (country: string) => {
    switch (country) {
      case "United States":
        return usStates
      case "India":
        return indianStates
      default:
        return []
    }
  }

  const shouldShowStateDropdown = (country: string) => {
    return country === "United States" || country === "India"
  }

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      item: "",
      description: "",
      quantity: 1,
      price: 0,
    }
    setInvoiceData((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem],
    }))
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setInvoiceData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const removeLineItem = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((item) => item.id !== id),
    }))
  }

  const calculateSubtotal = () => {
    return invoiceData.lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * (invoiceData.taxRate / 100)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const getCurrentCurrency = () => {
    return currencies.find((c) => c.code === invoiceData.currency) || currencies[0]
  }

  const formatCurrency = (amount: number) => {
    const currency = getCurrentCurrency()
    return `${currency.symbol}${amount.toFixed(2)}`
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setSubmitStatus("idle")

    try {
      const payload = {
        ...invoiceData,
        subtotal: calculateSubtotal(),
        taxAmount: calculateTax(),
        total: calculateTotal(),
        currencySymbol: getCurrentCurrency().symbol,
      }

      const response = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const responseData = await response.json()
      setWebhookResponse(responseData)

      if (response.ok) {
        setSubmitStatus("success")
        setShowInvoicePreview(true)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting invoice:", error)
      setSubmitStatus("error")
      setWebhookResponse({ error: "Failed to submit invoice" })
    } finally {
      setIsLoading(false)
    }
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const currency = getCurrentCurrency()

    // Use text representation for currency symbols to avoid encoding issues
    const getCurrencyText = (symbol: string) => {
      switch (symbol) {
        case "₹":
          return "Rs."
        case "$":
          return "$"
        case "€":
          return "EUR"
        case "£":
          return "GBP"
        case "¥":
          return "JPY"
        default:
          return symbol
      }
    }

    const currencyText = getCurrencyText(currency.symbol)

    const formatPDFCurrency = (amount: number) => {
      return `${currencyText}${amount.toFixed(2)}`
    }

    // Header
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("INVOICE", 20, 30)

    // Invoice details
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 140, 30)
    doc.text(`Invoice Date: ${invoiceData.invoiceDate}`, 140, 40)
    doc.text(`Amount Due: ${formatPDFCurrency(calculateTotal())}`, 140, 50)

    // Bill From
    doc.setFont("helvetica", "bold")
    doc.text("BILL FROM:", 20, 60)
    doc.setFont("helvetica", "normal")
    let yPos = 70
    doc.text(invoiceData.companyName, 20, yPos)
    yPos += 10
    doc.text(invoiceData.companyAddress, 20, yPos)
    yPos += 10
    doc.text(`${invoiceData.companyCity}, ${invoiceData.companyState} ${invoiceData.companyZip}`, 20, yPos)
    yPos += 10
    doc.text(invoiceData.companyCountry, 20, yPos)
    yPos += 10
    doc.text(invoiceData.companyEmail, 20, yPos)

    // Bill To
    doc.setFont("helvetica", "bold")
    doc.text("BILL TO:", 20, yPos + 20)
    doc.setFont("helvetica", "normal")
    yPos += 30
    doc.text(invoiceData.customerName, 20, yPos)
    yPos += 10
    doc.text(invoiceData.customerAddress, 20, yPos)
    yPos += 10
    doc.text(`${invoiceData.customerCity}, ${invoiceData.customerState} ${invoiceData.customerZip}`, 20, yPos)
    yPos += 10
    doc.text(invoiceData.customerCountry, 20, yPos)
    yPos += 10
    doc.text(invoiceData.customerEmail, 20, yPos)

    // Items table with correct headers
    const tableData = invoiceData.lineItems.map((item) => [
      item.item,
      item.description,
      item.quantity.toString(),
      formatPDFCurrency(item.price),
      formatPDFCurrency(item.quantity * item.price),
    ])

    doc.autoTable({
      startY: yPos + 20,
      head: [["Item", "Description", "Quantity", "Price", "Amount"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [255, 116, 53] },
    })

    // Summary
    const finalY = doc.lastAutoTable.finalY + 10
    const subtotal = calculateSubtotal()
    const tax = calculateTax()
    const total = calculateTotal()

    doc.text(`Subtotal: ${formatPDFCurrency(subtotal)}`, 140, finalY)
    doc.text(`Tax (${invoiceData.taxRate}%): ${formatPDFCurrency(tax)}`, 140, finalY + 10)
    doc.setFont("helvetica", "bold")
    doc.text(`Total: ${formatPDFCurrency(total)}`, 140, finalY + 20)

    // Notes
    if (invoiceData.notes) {
      doc.setFont("helvetica", "normal")
      doc.text("Notes:", 20, finalY + 40)
      doc.text(invoiceData.notes, 20, finalY + 50, { maxWidth: 170 })
    }

    doc.save(`Invoice-${invoiceData.invoiceNumber}.pdf`)
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900 font-inter">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900 rounded-2xl p-8 mb-8 text-center border border-gray-200 dark:border-gray-800">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white font-poppins">
              Free Invoice Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Create professional invoices in minutes</p>
          </motion.div>
        </div>

        <Card className="shadow-xl border-0 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-gray-800">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center items-center gap-2 mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step <= currentStep 
                        ? "bg-orange-500 text-white" 
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-8 h-0.5 mx-2 transition-colors ${
                        step < currentStep 
                          ? "bg-orange-500" 
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white font-poppins">
              STEP {currentStep} OF 3
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white font-poppins">
                    Enter your company information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-gray-900 dark:text-white">
                        Your company name
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Your company name"
                        value={invoiceData.companyName}
                        onChange={(e) => updateInvoiceData("companyName", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail" className="text-gray-900 dark:text-white">
                        Your email address
                      </Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        placeholder="Your email address"
                        value={invoiceData.companyEmail}
                        onChange={(e) => updateInvoiceData("companyEmail", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyAddress" className="text-gray-900 dark:text-white">
                      Address
                    </Label>
                    <Input
                      id="companyAddress"
                      placeholder="Address"
                      value={invoiceData.companyAddress}
                      onChange={(e) => updateInvoiceData("companyAddress", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyCity" className="text-gray-900 dark:text-white">
                        City
                      </Label>
                      <Input
                        id="companyCity"
                        placeholder="City"
                        value={invoiceData.companyCity}
                        onChange={(e) => updateInvoiceData("companyCity", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyZip" className="text-gray-900 dark:text-white">
                        Zip/postal code
                      </Label>
                      <Input
                        id="companyZip"
                        placeholder="Zip/postal code"
                        value={invoiceData.companyZip}
                        onChange={(e) => updateInvoiceData("companyZip", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyCountry" className="text-gray-900 dark:text-white">
                        Country/Region
                      </Label>
                      <Select
                        value={invoiceData.companyCountry}
                        onValueChange={(value) => updateInvoiceData("companyCountry", value)}
                      >
                        <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                          {countries.map((country) => (
                            <SelectItem key={country} value={country} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyState" className="text-gray-900 dark:text-white">
                        State/Province
                      </Label>
                      {shouldShowStateDropdown(invoiceData.companyCountry) ? (
                        <Select
                          value={invoiceData.companyState}
                          onValueChange={(value) => updateInvoiceData("companyState", value)}
                        >
                          <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500">
                            <SelectValue placeholder="Select state/province" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                            {getStatesForCountry(invoiceData.companyCountry).map((state) => (
                              <SelectItem key={state} value={state} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id="companyState"
                          placeholder="State/Province"
                          value={invoiceData.companyState}
                          onChange={(e) => updateInvoiceData("companyState", e.target.value)}
                          className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white font-poppins">
                    Enter customer and invoice information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName" className="text-gray-900 dark:text-white">
                        Your customer's name
                      </Label>
                      <Input
                        id="customerName"
                        placeholder="Your customer's name"
                        value={invoiceData.customerName}
                        onChange={(e) => updateInvoiceData("customerName", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerEmail" className="text-gray-900 dark:text-white">
                        Your customer's email
                      </Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        placeholder="Your customer's email"
                        value={invoiceData.customerEmail}
                        onChange={(e) => updateInvoiceData("customerEmail", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoiceNumber" className="text-gray-900 dark:text-white">
                        Invoice number
                      </Label>
                      <Input
                        id="invoiceNumber"
                        placeholder="01"
                        value={invoiceData.invoiceNumber}
                        onChange={(e) => updateInvoiceData("invoiceNumber", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerAddress" className="text-gray-900 dark:text-white">
                      Customer's address
                    </Label>
                    <Input
                      id="customerAddress"
                      placeholder="Customer's address"
                      value={invoiceData.customerAddress}
                      onChange={(e) => updateInvoiceData("customerAddress", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerCity" className="text-gray-900 dark:text-white">
                        City
                      </Label>
                      <Input
                        id="customerCity"
                        placeholder="City"
                        value={invoiceData.customerCity}
                        onChange={(e) => updateInvoiceData("customerCity", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerZip" className="text-gray-900 dark:text-white">
                        Zip/postal code
                      </Label>
                      <Input
                        id="customerZip"
                        placeholder="Zip/postal code"
                        value={invoiceData.customerZip}
                        onChange={(e) => updateInvoiceData("customerZip", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoiceDate" className="text-gray-900 dark:text-white">
                        Invoice date
                      </Label>
                      <Input
                        id="invoiceDate"
                        type="date"
                        value={invoiceData.invoiceDate}
                        onChange={(e) => updateInvoiceData("invoiceDate", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerCountry" className="text-gray-900 dark:text-white">
                        Country/Region
                      </Label>
                      <Select
                        value={invoiceData.customerCountry}
                        onValueChange={(value) => updateInvoiceData("customerCountry", value)}
                      >
                        <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                          {countries.map((country) => (
                            <SelectItem key={country} value={country} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerState" className="text-gray-900 dark:text-white">
                        State/Province
                      </Label>
                      {shouldShowStateDropdown(invoiceData.customerCountry) ? (
                        <Select
                          value={invoiceData.customerState}
                          onValueChange={(value) => updateInvoiceData("customerState", value)}
                        >
                          <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500">
                            <SelectValue placeholder="Select state/province" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                            {getStatesForCountry(invoiceData.customerCountry).map((state) => (
                              <SelectItem key={state} value={state} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id="customerState"
                          placeholder="State/Province"
                          value={invoiceData.customerState}
                          onChange={(e) => updateInvoiceData("customerState", e.target.value)}
                          className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white font-poppins">
                      Enter the items you wish to bill
                    </h2>
                    <div className="space-y-2">
                      <Label htmlFor="currency" className="text-gray-900 dark:text-white">
                        Currency
                      </Label>
                      <Select
                        value={invoiceData.currency}
                        onValueChange={(value) => updateInvoiceData("currency", value)}
                      >
                        <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500 w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                              {currency.symbol} {currency.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-2 font-medium text-sm text-gray-900 dark:text-white">
                      <div className="col-span-3">Item</div>
                      <div className="col-span-4">Description</div>
                      <div className="col-span-2">Quantity</div>
                      <div className="col-span-2">Price</div>
                      <div className="col-span-1">Amount</div>
                    </div>

                    {invoiceData.lineItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-12 gap-2 items-center"
                      >
                        <div className="col-span-3">
                          <Input
                            placeholder="Item"
                            value={item.item}
                            onChange={(e) => updateLineItem(item.id, "item", e.target.value)}
                            className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div className="col-span-4">
                          <Input
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                            className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="1"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                            className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="text"
                            inputMode="decimal"
                            placeholder="0.00"
                            value={item.price}
                            onChange={(e) => {
                              const value = e.target.value
                              // Allow only numbers and decimal point
                              if (value === "" || /^\d*\.?\d*$/.test(value)) {
                                updateLineItem(item.id, "price", value === "" ? 0 : Number.parseFloat(value) || 0)
                              }
                            }}
                            className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                            style={{
                              // Remove spinner arrows
                              MozAppearance: "textfield",
                              WebkitAppearance: "none",
                              appearance: "none",
                            }}
                          />
                        </div>
                        <div className="col-span-1 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {formatCurrency(item.quantity * item.price)}
                          </span>
                          {invoiceData.lineItems.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLineItem(item.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 h-auto ml-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    <Button
                      variant="ghost"
                      onClick={addLineItem}
                      className="text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add a line item
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-gray-900 dark:text-white">
                        Notes / Memo
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Additional notes..."
                        value={invoiceData.notes}
                        onChange={(e) => updateInvoiceData("notes", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500 min-h-[120px]"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 space-y-3 border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>Subtotal</span>
                          <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <span>Tax ({invoiceData.taxRate}%)</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsEditingTax(!isEditingTax)}
                              className="p-1 h-auto text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="font-medium">{formatCurrency(calculateTax())}</span>
                        </div>
                        {isEditingTax && (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              step="0.1"
                              value={invoiceData.taxRate}
                              onChange={(e) => updateInvoiceData("taxRate", Number.parseFloat(e.target.value) || 0)}
                              className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500 w-20"
                            />
                            <span className="text-gray-600 dark:text-gray-400">%</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsEditingTax(false)}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                          <div className="bg-orange-500 rounded-lg p-4 text-white">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-semibold">Total</span>
                              <span className="text-2xl font-bold">{formatCurrency(calculateTotal())}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={nextStep}
                  className="bg-orange-500 hover:bg-orange-600 dark:hover:bg-[#d45616] text-white font-semibold transition-opacity px-6 py-4 rounded-lg"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-orange-500 hover:bg-orange-600 dark:hover:bg-[#d45616] text-white font-semibold transition-opacity px-8 py-4 rounded-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Invoice"
                  )}
                </Button>
              )}
            </div>

            {submitStatus !== "idle" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                <Alert
                  className={`${
                    submitStatus === "success"
                      ? "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800 text-green-800 dark:text-green-100"
                      : "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800 text-red-800 dark:text-red-100"
                  }`}
                >
                  {submitStatus === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  <AlertDescription>
                    {submitStatus === "success"
                      ? "Invoice submitted successfully!"
                      : "Failed to submit invoice. Please try again."}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {showInvoicePreview && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                <Card className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-white font-poppins">
                      Invoice Preview
                    </CardTitle>
                    <Button
                      onClick={generatePDF}
                      className="bg-orange-500 hover:bg-orange-600 dark:hover:bg-[#d45616] text-white font-semibold transition-opacity px-5 py-3 rounded-lg"
                    >
                      Download PDF
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-lg p-6">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins">
                            INVOICE
                          </h1>
                        </div>
                        <div className="text-right">
                          <div className="mb-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              INVOICE #
                            </span>
                            <div className="text-gray-600 dark:text-gray-400">{invoiceData.invoiceNumber}</div>
                          </div>
                          <div className="mb-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              INVOICE DATE
                            </span>
                            <div className="text-gray-600 dark:text-gray-400">{invoiceData.invoiceDate}</div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              AMOUNT DUE
                            </span>
                            <div className="text-xl font-bold text-orange-500">
                              {formatCurrency(calculateTotal())}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bill From and Bill To */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h3 className="font-bold mb-3 text-gray-900 dark:text-white">
                            BILL FROM:
                          </h3>
                          <div className="text-gray-600 dark:text-gray-400 space-y-1">
                            <div className="font-semibold">{invoiceData.companyName}</div>
                            <div>{invoiceData.companyAddress}</div>
                            <div>
                              {invoiceData.companyCity}, {invoiceData.companyState} {invoiceData.companyZip}
                            </div>
                            <div>{invoiceData.companyCountry}</div>
                            <div>{invoiceData.companyEmail}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold mb-3 text-gray-900 dark:text-white">
                            BILL TO:
                          </h3>
                          <div className="text-gray-600 dark:text-gray-400 space-y-1">
                            <div className="font-semibold">{invoiceData.customerName}</div>
                            <div>{invoiceData.customerAddress}</div>
                            <div>
                              {invoiceData.customerCity}, {invoiceData.customerState} {invoiceData.customerZip}
                            </div>
                            <div>{invoiceData.customerCountry}</div>
                            <div>{invoiceData.customerEmail}</div>
                          </div>
                        </div>
                      </div>

                      {/* Items Table */}
                      <div className="mb-8">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50 dark:bg-zinc-800">
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                                  Item
                                </th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                                  Description
                                </th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                                  Quantity
                                </th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                                  Price
                                </th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoiceData.lineItems.map((item, index) => (
                                <tr key={item.id}>
                                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                                    {item.item}
                                  </td>
                                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                                    {item.description}
                                  </td>
                                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                                    {item.quantity}
                                  </td>
                                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                                    {formatCurrency(item.price)}
                                  </td>
                                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">
                                    {formatCurrency(item.quantity * item.price)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="flex justify-end mb-8">
                        <div className="w-64">
                          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">SUBTOTAL</span>
                            <span className="font-semibold text-gray-600 dark:text-gray-400">
                              {formatCurrency(calculateSubtotal())}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">TAX ({invoiceData.taxRate}%)</span>
                            <span className="font-semibold text-gray-600 dark:text-gray-400">
                              {formatCurrency(calculateTax())}
                            </span>
                          </div>
                          <div className="bg-orange-500 flex justify-between py-3 text-white font-bold text-lg rounded-lg mt-2 px-4">
                            <span>TOTAL</span>
                            <span>{formatCurrency(calculateTotal())}</span>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {invoiceData.notes && (
                        <div className="mb-8">
                          <h3 className="font-bold mb-3 text-gray-900 dark:text-white">
                            Notes:
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                            {invoiceData.notes}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex justify-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          onClick={() => setShowInvoicePreview(false)}
                          variant="outline"
                          className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          Back to Form
                        </Button>
                        <Button
                          onClick={generatePDF}
                          className="bg-orange-500 hover:bg-orange-600 dark:hover:bg-[#d45616] text-white font-semibold transition-opacity px-6 py-3 rounded-lg"
                        >
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        
        /* Remove number input spinners */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  )
}
