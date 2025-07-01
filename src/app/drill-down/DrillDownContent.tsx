'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Settings, 
  Info,
  ArrowLeft,
  X,
  BarChart3,
  Users,
  CreditCard,
  Package,
  Home,
  FileText,
  TrendingUp,
  MoreHorizontal,
  AlertCircle,
  List,
  ArrowRightLeft,
  User,
  Box,
  Layers,
  Clock,
  Wallet,
  Receipt,
  LineChart,
  Ellipsis
} from 'lucide-react';
import Link from 'next/link';

export default function DrillDownContent() {
  const searchParams = useSearchParams();
  const [showChart, setShowChart] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [animateChart, setAnimateChart] = useState(false);
  
  // Get data from URL parameters
  const title = searchParams.get('title') || 'Net change in accounts receivable';
  const amount = searchParams.get('amount') || '$3,365.00 USD';
  const period = searchParams.get('period') || 'Dec 1, 2024 to Dec 31, 2024';
  const label = searchParams.get('label') || '';
  const value = searchParams.get('value') || '';

  // Mock drill-down data
  const drillDownData = {
    title,
    amount,
    period,
    entries: [
      {
        eventType: "Payment received",
        debit: "$1,000.00",
        credit: "",
        customerEmail: "john.doe@example.com",
        invoiceId: "in_2PL456JNE53NHK34",
        date: "Dec 31, 10:00 AM"
      },
      {
        eventType: "Placeholder event type",
        debit: "",
        credit: "($200.00)",
        customerEmail: "sarah.jones@example.com",
        invoiceId: "mj_4QR678STU90VWX34",
        date: "Dec 21, 10:00 AM"
      },
      {
        eventType: "Placeholder event type",
        debit: "$500.00",
        credit: "",
        customerEmail: "michael@example.com",
        invoiceId: "in_3XZ789ABC45DEF12",
        date: "Dec 21, 10:00 AM"
      },
      {
        eventType: "Placeholder event type",
        debit: "$750.00",
        credit: "($150.00)",
        customerEmail: "sarah.jones@example.com",
        invoiceId: "in_9JK456LMN78OPQ21",
        date: "Dec 19, 10:00 AM"
      },
      {
        eventType: "Placeholder event type",
        debit: "",
        credit: "",
        customerEmail: "john.doe@example.com",
        invoiceId: "in_2PL456JNE53NHK34",
        date: "Dec 19, 10:00 AM"
      },
      {
        eventType: "Placeholder event type",
        debit: "",
        credit: "($125.00)",
        customerEmail: "daniel.martin@example.com",
        invoiceId: "in_2PL456JNE53NHK34",
        date: "Dec 17, 10:00 AM"
      },
      {
        eventType: "Placeholder event type",
        debit: "",
        credit: "($300.00)",
        customerEmail: "emma.jackson@example.com",
        invoiceId: "in_2PL456JNE53NHK34",
        date: "Dec 15, 10:00 AM"
      },
      {
        eventType: "Placeholder event type",
        debit: "$600.00",
        credit: "",
        customerEmail: "tom.white@example.com",
        invoiceId: "in_9RST789XYZ34LMN45",
        date: "Dec 15, 10:00 AM"
      },
      {
        eventType: "Placeholder event type",
        debit: "$800.00",
        credit: "",
        customerEmail: "john.doe@example.com",
        invoiceId: "in_2PL456JNE53NHK34",
        date: "Dec 14, 10:00 AM"
      },
      {
        eventType: "Invoice created",
        debit: "$1,200.00",
        credit: "",
        customerEmail: "alice.smith@example.com",
        invoiceId: "in_3ABC123DEF456GHI",
        date: "Dec 13, 2:30 PM"
      },
      {
        eventType: "Credit note issued",
        debit: "",
        credit: "($450.00)",
        customerEmail: "bob.wilson@example.com",
        invoiceId: "cn_7XYZ789ABC123DEF",
        date: "Dec 12, 11:15 AM"
      },
      {
        eventType: "Payment received",
        debit: "$2,500.00",
        credit: "",
        customerEmail: "carol.brown@example.com",
        invoiceId: "in_8DEF456GHI789JKL",
        date: "Dec 11, 9:45 AM"
      },
      {
        eventType: "Refund processed",
        debit: "",
        credit: "($180.00)",
        customerEmail: "david.lee@example.com",
        invoiceId: "rf_9GHI789JKL123MNO",
        date: "Dec 10, 4:20 PM"
      },
      {
        eventType: "Invoice adjustment",
        debit: "$350.00",
        credit: "($75.00)",
        customerEmail: "eve.garcia@example.com",
        invoiceId: "in_4JKL123MNO456PQR",
        date: "Dec 9, 1:10 PM"
      },
      {
        eventType: "Payment received",
        debit: "$925.00",
        credit: "",
        customerEmail: "frank.miller@example.com",
        invoiceId: "in_5MNO456PQR789STU",
        date: "Dec 8, 10:30 AM"
      },
      {
        eventType: "Dispute raised",
        debit: "",
        credit: "($675.00)",
        customerEmail: "grace.taylor@example.com",
        invoiceId: "dp_6PQR789STU123VWX",
        date: "Dec 7, 3:45 PM"
      },
      {
        eventType: "Invoice created",
        debit: "$1,850.00",
        credit: "",
        customerEmail: "henry.anderson@example.com",
        invoiceId: "in_7STU123VWX456YZA",
        date: "Dec 6, 8:20 AM"
      },
      {
        eventType: "Payment received",
        debit: "$540.00",
        credit: "",
        customerEmail: "iris.thomas@example.com",
        invoiceId: "in_8VWX456YZA789BCD",
        date: "Dec 5, 2:15 PM"
      },
      {
        eventType: "Credit adjustment",
        debit: "",
        credit: "($220.00)",
        customerEmail: "jack.moore@example.com",
        invoiceId: "ca_9YZA789BCD123EFG",
        date: "Dec 4, 11:50 AM"
      },
      {
        eventType: "Invoice created",
        debit: "$1,475.00",
        credit: "",
        customerEmail: "kate.clark@example.com",
        invoiceId: "in_1BCD123EFG456HIJ",
        date: "Dec 3, 9:30 AM"
      },
      {
        eventType: "Payment received",
        debit: "$780.00",
        credit: "",
        customerEmail: "liam.rodriguez@example.com",
        invoiceId: "in_2EFG456HIJ789KLM",
        date: "Dec 2, 4:10 PM"
      },
      {
        eventType: "Void transaction",
        debit: "",
        credit: "($95.00)",
        customerEmail: "mia.lewis@example.com",
        invoiceId: "vt_3HIJ789KLM123NOP",
        date: "Dec 1, 12:25 PM"
      },
      {
        eventType: "Payment received",
        debit: "$1,320.00",
        credit: "",
        customerEmail: "noah.walker@example.com",
        invoiceId: "in_4KLM123NOP456QRS",
        date: "Nov 30, 3:40 PM"
      },
      {
        eventType: "Invoice adjustment",
        debit: "$125.00",
        credit: "($50.00)",
        customerEmail: "olivia.hall@example.com",
        invoiceId: "in_5NOP456QRS789TUV",
        date: "Nov 29, 10:15 AM"
      },
      {
        eventType: "Credit note issued",
        debit: "",
        credit: "($385.00)",
        customerEmail: "paul.allen@example.com",
        invoiceId: "cn_6QRS789TUV123WXY",
        date: "Nov 28, 1:55 PM"
      },
      {
        eventType: "Payment received",
        debit: "$2,100.00",
        credit: "",
        customerEmail: "quinn.young@example.com",
        invoiceId: "in_7TUV123WXY456ZAB",
        date: "Nov 27, 11:20 AM"
      },
      {
        eventType: "Refund processed",
        debit: "",
        credit: "($265.00)",
        customerEmail: "ruby.king@example.com",
        invoiceId: "rf_8WXY456ZAB789CDE",
        date: "Nov 26, 2:35 PM"
      },
      {
        eventType: "Invoice created",
        debit: "$890.00",
        credit: "",
        customerEmail: "sam.wright@example.com",
        invoiceId: "in_9ZAB789CDE123FGH",
        date: "Nov 25, 9:10 AM"
      },
      {
        eventType: "Payment received",
        debit: "$1,650.00",
        credit: "",
        customerEmail: "tina.lopez@example.com",
        invoiceId: "in_1CDE123FGH456IJK",
        date: "Nov 24, 4:25 PM"
      },
      {
        eventType: "Dispute resolved",
        debit: "$425.00",
        credit: "",
        customerEmail: "uma.hill@example.com",
        invoiceId: "dr_2FGH456IJK789LMN",
        date: "Nov 23, 12:45 PM"
      },
      {
        eventType: "Credit adjustment",
        debit: "",
        credit: "($155.00)",
        customerEmail: "victor.green@example.com",
        invoiceId: "ca_3IJK789LMN123OPQ",
        date: "Nov 22, 10:05 AM"
      },
      {
        eventType: "Invoice created",
        debit: "$1,275.00",
        credit: "",
        customerEmail: "wendy.adams@example.com",
        invoiceId: "in_4LMN123OPQ456RST",
        date: "Nov 21, 3:15 PM"
      },
      {
        eventType: "Payment received",
        debit: "$695.00",
        credit: "",
        customerEmail: "xavier.baker@example.com",
        invoiceId: "in_5OPQ456RST789UVW",
        date: "Nov 20, 1:30 PM"
      },
      {
        eventType: "Void transaction",
        debit: "",
        credit: "($110.00)",
        customerEmail: "yara.gonzalez@example.com",
        invoiceId: "vt_6RST789UVW123XYZ",
        date: "Nov 19, 11:40 AM"
      },
      {
        eventType: "Invoice adjustment",
        debit: "$240.00",
        credit: "($85.00)",
        customerEmail: "zoe.nelson@example.com",
        invoiceId: "in_7UVW123XYZ456ABC",
        date: "Nov 18, 2:50 PM"
      }
    ],
    total: {
      debit: "$22,840.00",
      credit: "$(4,275.00)"
    }
  };

  useEffect(() => {
    if (showChart) {
      const timer = setTimeout(() => setAnimateChart(true), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimateChart(false);
    }
  }, [showChart]);

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content - Using flex layout instead of fixed positioning */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Page Header - Fixed */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0 z-20">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <button 
                  onClick={handleBackClick}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Income statement
                </button>
                <span>›</span>
                <span>Activity breakdown</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">{drillDownData.title}</h1>
              <p className="text-2xl font-bold text-gray-900 mt-1">{drillDownData.amount}</p>
            </div>
          </div>
        </div>

        {/* Controls - Fixed */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex-shrink-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Period</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {drillDownData.period}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                  Group
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                  Filter
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                Edit columns
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                Export
              </button>
            </div>
          </div>

          {/* Chart Toggle */}
          <div className="mt-4 p-4 bg-white rounded border">
            <div className="flex h-10 items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showChart}
                  onChange={(e) => setShowChart(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <div>
                <div className="font-medium text-gray-900">Show chart</div>
                <div className="text-sm text-gray-500">See how your {label || 'accounts receivable'} has changed over time.</div>
              </div>
            </div>
            
            {/* Forecast Toggle - Only show when chart is enabled */}
            {showChart && (
              <div className="flex items-center gap-3 mt-3 ml-14">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showForecast}
                    onChange={(e) => setShowForecast(e.target.checked)}
                    className="w-3.5 h-3.5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-1 flex-shrink-0"
                  />
                  <div className="ml-2.5">
                    <div className="font-medium text-gray-900">Show forecast</div>
                    <div className="text-sm text-gray-500">Display projected values for the remaining period.</div>
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Chart Area */}
          {showChart && (
            <div className="mt-4 p-6 bg-white rounded border">
              <div className="h-80 relative">
                {/* Chart Container */}
                <div className="h-full flex flex-col">
                  {/* Y-axis labels */}
                  <div className="flex-1 relative">
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
                      <span>$3K</span>
                      <span>$2K</span>
                      <span>$1K</span>
                      <span>0</span>
                    </div>
                    
                    {/* Chart area */}
                    <div className="ml-8 h-full flex items-end justify-between px-4 border-l border-b border-gray-200">
                      {/* Generate bars for each day */}
                      {Array.from({ length: 31 }, (_, i) => {
                        const day = i + 1;
                        const isActualData = day <= 22; // Actual data up to Dec 22
                        const isForecastData = day > 22; // Forecast data from Dec 23 onwards
                        
                        // Don't show forecast bars if forecast is disabled
                        if (isForecastData && !showForecast) {
                          return <div key={day} className="w-4" />;
                        }
                        
                        // Generate realistic but varied data
                        const baseHeight = 30 + (Math.sin(i * 0.3) * 20) + (Math.cos(i * 0.5) * 15);
                        const variation = Math.sin(i * 0.7) * 10;
                        let height = Math.max(10, baseHeight + variation);
                        
                        // For forecast data, add some uncertainty/variation
                        if (isForecastData) {
                          height = height * (0.8 + Math.random() * 0.4); // Add some randomness to forecast
                        }
                        
                        const isHighlight = day === 24; // Highlight one bar
                        
                        // Different styling for actual vs forecast data
                        let barClass = '';
                        if (isActualData) {
                          barClass = isHighlight ? 'bg-purple-600' : 'bg-purple-500';
                        } else {
                          // Forecast bars - same purple color but with texture lines
                          barClass = isHighlight ? 'bg-purple-600' : 'bg-purple-500';
                        }
                        
                        return (
                          <div
                            key={day}
                            className={`w-4 rounded-t transition-all duration-700 ease-out relative ${barClass}`}
                            style={{
                              height: animateChart ? `${height}%` : '0%',
                              transitionDelay: `${i * 20}ms`,
                              opacity: animateChart ? (isForecastData ? 0.6 : 1) : 0,
                              backgroundImage: isForecastData ? 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)' : 'none'
                            }}
                          >
                            {/* Add a small indicator for forecast data */}
                            {isForecastData && (
                              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full opacity-80"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* X-axis labels */}
                  <div className="ml-8 flex justify-between text-xs text-gray-500 mt-2 px-4">
                    <span>Dec 1</span>
                    <span>Dec 8</span>
                    <span>Dec 15</span>
                    <span>Dec 22</span>
                    <span>Dec 29</span>
                  </div>
                </div>
              </div>
              
              {/* Chart insight - Now properly positioned within the chart section */}
              <div className={`mt-4 flex items-center gap-2 text-sm text-gray-600 transition-all duration-500 ${
                animateChart ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`} style={{ transitionDelay: '600ms' }}>
                <span className="text-purple-500">✨</span>
                <span>
                  {showForecast 
                    ? "Peak activity on Dec 24th with $2.1K. Forecast shows steady decline through month-end, suggesting seasonal payment patterns."
                    : "Peak activity on Dec 24th with $2.1K in receivables. Daily average of $1.8K shows consistent collection performance."
                  }
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Content Area - Takes remaining space */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Table Info - Fixed */}
          <div className="px-6 py-3 bg-white border-b border-gray-200 flex-shrink-0">
            <div className="text-sm text-gray-500">
              {drillDownData.entries.length} entries • Updated today, at 11:00 PM
            </div>
          </div>
          
          {/* Fixed Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 flex-shrink-0">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
              </colgroup>
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Event type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Debit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Credit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Customer email ↑
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Invoice ID ↑
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Date ↑
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          
          {/* Scrollable Table Body Only */}
          <div className="flex-1 overflow-y-auto bg-white">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
              </colgroup>
              <tbody className="bg-white divide-y divide-gray-200">
                {drillDownData.entries.map((entry: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.eventType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.debit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.credit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.customerEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.invoiceId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer - Sticky at bottom */}
        <div className="bg-gray-50 border-t border-gray-200 flex-shrink-0 sticky bottom-0">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
            </colgroup>
            <tbody>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-500">
                  Total
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {drillDownData.total.debit}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {drillDownData.total.credit}
                </td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 