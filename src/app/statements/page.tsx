'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { BarChart3, Users, CreditCard, Package, Home, FileText, TrendingUp, MoreHorizontal, Download, Settings, Plus, Receipt, PieChart, ListChecks, FileStack, BadgePercent, BookText, FileBarChart2, FileSpreadsheet, FilePieChart, FileSignature, FileInput, FileOutput, FileCheck2, FileSearch, FileCog, FileText as FileTextIcon, LineChart, ClipboardList, ClipboardCheck, ClipboardSignature, ClipboardX, ClipboardEdit, ClipboardCopy, ClipboardType, ClipboardMinus, ClipboardPlus, Clipboard } from 'lucide-react'
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

// Mock data for the revenue recognition report
const revenueData = {
  totalRevenue: 45000.00,
  revenueFromSales: 45000.00,
  contraRevenue: {
    badDebt: 1400.25,
    creditNotes: 650.00,
    refunds: 325.00,
    disputes: 300.00,
    voids: 120.00,
    total: 2795.25
  },
  netRevenue: 42204.75,
  expenses: {
    balanceAdjustments: 2000.00,
    total: 2000.00
  },
  gainsAndLosses: {
    recoverables: 5000.00,
    foreignExchangeLoss: 105532.65,
    total: -100532.65
  },
  netIncome: -60327.90
};

// Mock comparison data
const comparisonData = {
  totalRevenue: 38000.00,
  revenueFromSales: 38000.00,
  contraRevenue: {
    badDebt: 1200.50,
    creditNotes: 580.00,
    refunds: 290.00,
    disputes: 250.00,
    voids: 95.00,
    total: 2415.50
  },
  netRevenue: 35584.50,
  expenses: {
    balanceAdjustments: 1800.00,
    total: 1800.00
  },
  gainsAndLosses: {
    recoverables: 4200.00,
    foreignExchangeLoss: 89245.30,
    total: -85045.30
  },
  netIncome: -51260.80
};

interface ClickableNumberProps {
  value: number;
  isNegative?: boolean;
  onClick?: () => void;
  className?: string;
}

function ClickableNumber({ value, isNegative = false, onClick, className = "" }: ClickableNumberProps) {
  const formattedValue = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const displayValue = isNegative || value < 0 ? `(${formattedValue})` : formattedValue;

  return (
    <button
      onClick={onClick}
      className={`text-right text-gray-900 font-medium hover:bg-blue-50 hover:text-blue-800 transition-colors duration-150 px-2 py-1 rounded ${className}`}
    >
      {displayValue}
    </button>
  );
}

// Helper to get previous month range from a date range string like 'Dec 1, 2024 to Dec 31, 2024'
function getPreviousMonthRange(periodStr: string): string {
  const match = periodStr.match(/([A-Za-z]+) (\d{1,2}), (\d{4}) to ([A-Za-z]+) (\d{1,2}), (\d{4})/);
  if (!match) return periodStr;
  let [, startMonth, , startYear, , , ] = match;
  let start = new Date(`${startMonth} 1, ${startYear}`);
  start.setMonth(start.getMonth() - 1);
  const prevMonth = start.toLocaleString('en-US', { month: 'short' });
  const prevYear = start.getFullYear();
  const daysInPrevMonth = new Date(prevYear, start.getMonth() + 1, 0).getDate();
  return `${prevMonth} 1, ${prevYear} to ${prevMonth} ${daysInPrevMonth}, ${prevYear}`;
}

// Helper function to parse period string to Date
function parsePeriodToDate(period: string): Date | undefined {
  // Example: "Nov 1, 2024 to Nov 30, 2024" => Nov 1, 2024
  const match = period.match(/([A-Za-z]+ \d{1,2}, \d{4})/);
  if (match) return new Date(match[1]);
  return undefined;
}

export default function StatementsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2024');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isComparing, setIsComparing] = useState(false);
  const [comparePeriod, setComparePeriod] = useState('');
  const [selectedReportItem, setSelectedReportItem] = useState<string>('accounts receivable');
  const [showCompareCalendar, setShowCompareCalendar] = useState(false);

  const periodOptions = [
    'Last month',
    'Last quarter', 
    'Last year',
    'This month',
    'This quarter',
    'This year',
    'Previous month',
    'Previous quarter',
    'Previous year'
  ];

  const getPeriodDateRange = (period: string) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    switch (period) {
      case 'Last month':
        const lastMonth = new Date(currentYear, currentMonth - 1, 1);
        const lastMonthEnd = new Date(currentYear, currentMonth, 0);
        return `${lastMonth.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${lastMonthEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case 'Q4 2024':
        return 'Dec 1, 2024 to Dec 31, 2024';
      default:
        // If the period is a date range, return as is
        if (/to/.test(period)) return period;
        return period;
    }
  };

  const handleCompareToggle = () => {
    if (isComparing) {
      setIsComparing(false);
      setComparePeriod('');
    } else {
      setIsComparing(true);
      // If selectedPeriod is a date range, set comparePeriod to previous month
      const selectedRange = getPeriodDateRange(selectedPeriod);
      if (/to/.test(selectedRange)) {
        setComparePeriod(getPreviousMonthRange(selectedRange));
      } else {
        const defaultCompare = selectedPeriod === 'Last month' ? 'Previous month' : 'Last month';
        setComparePeriod(defaultCompare);
      }
    }
  };

  const handleNumberClick = (label: string, value: number) => {
    setSelectedReportItem(label.toLowerCase());
    const formattedValue = Math.abs(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const displayValue = value < 0 ? `($${formattedValue}) USD` : `$${formattedValue} USD`;
    
    const params = new URLSearchParams({
      title: label,
      amount: displayValue,
      period: "Dec 1, 2024 to Dec 31, 2024",
      label: label,
      value: value.toString()
    });
    
    window.location.href = `/drill-down?${params.toString()}`;
  };

  // Add refs and effect for outside click
  const compareButtonRef = useRef<HTMLButtonElement | null>(null);
  const calendarPopoverRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!showCompareCalendar) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarPopoverRef.current &&
        !calendarPopoverRef.current.contains(event.target as Node) &&
        compareButtonRef.current &&
        !compareButtonRef.current.contains(event.target as Node)
      ) {
        setShowCompareCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCompareCalendar]);

  return (
    <div className="pt-2 pl-4 pb-16 w-full max-w-[1400px] mx-auto">
      {/* Page header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Revenue Recognition</h1>
      <div className="flex items-start gap-4">
        {/* Vertical Tabs Sidebar */}
        <div className="w-72 flex flex-col bg-white">
          <nav className="flex flex-col gap-4 mb-8 mt-2">
            <button className="flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-gray-800 border border-gray-200 rounded-xl bg-white transition-all whitespace-nowrap min-w-[220px]">
              <ListChecks className="w-6 h-6 p-1 bg-gray-100 rounded-lg" />
              <span>Balance sheet</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-[14px] font-semibold text-[#635bff] border-2 border-[#635bff] rounded-xl bg-[#f5f8ff] shadow-sm whitespace-nowrap min-w-[220px]">
              <CreditCard className="w-6 h-6 p-1 bg-[#f5f8ff] text-[#635bff] rounded-lg" />
              <span>Income statement</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-gray-800 border border-gray-200 rounded-xl bg-white transition-all whitespace-nowrap min-w-[220px]">
              <TrendingUp className="w-6 h-6 p-1 bg-gray-100 rounded-lg" />
              <span>Revenue recognition summary</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-gray-800 border border-gray-200 rounded-xl bg-white transition-all whitespace-nowrap min-w-[220px]">
              <FileSpreadsheet className="w-6 h-6 p-1 bg-gray-100 rounded-lg" />
              <span>Trial balance</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-gray-800 border border-gray-200 rounded-xl bg-white transition-all whitespace-nowrap min-w-[220px]">
              <FileBarChart2 className="w-6 h-6 p-1 bg-gray-100 rounded-lg" />
              <span>Accounts receivable aging</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-gray-800 border border-gray-200 rounded-xl bg-white transition-all whitespace-nowrap min-w-[220px]">
              <PieChart className="w-6 h-6 p-1 bg-gray-100 rounded-lg" />
              <span>Debits and credits</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-gray-800 border border-gray-200 rounded-xl bg-white transition-all whitespace-nowrap min-w-[220px]">
              <MoreHorizontal className="w-6 h-6 p-1 bg-gray-100 rounded-lg" />
              <span>Corrections</span>
            </button>
          </nav>
          <div className="mt-auto">
            <div className="bg-white p-0 rounded-none border-0">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Feedback about this report</h3>
              <textarea
                placeholder="Tell us what you like or don't like about this report."
                className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none"
                rows={3}
              />
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 w-full">
                Share feedback
              </button>
            </div>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col pl-4 pr-4">
          <div className="bg-gray-50 rounded-xl p-4">
            {/* Info Box */}
            <div className="bg-blue-50 p-2 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                This report summarizes your company's financial performance based on Stripe data for the specified period. Positive amounts indicate income, while negative amounts in parentheses represent contra revenue and expenses. <a href="#" className="text-blue-600 hover:underline">Learn more</a>
              </p>
            </div>
            {/* Main Card */}
            <div className="bg-white rounded-xl shadow border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex h-10 items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Income statement</h2>
                    <p className="text-sm text-gray-500">Updated 2 hours ago</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 text-gray-900 font-medium">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              {/* Content placeholder */}
              <div className="p-4">
                {/* Filter Bar */}
                <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-4">
                  {/* Currency Filter Pill */}
                  <div className="flex items-center rounded-full border border-gray-300 bg-white h-7 text-xs font-medium text-gray-700 px-2">
                    <span className="pl-2 pr-1">Currency</span>
                    <span className="mx-1 text-gray-300">|</span>
                    <button className="text-blue-600 font-semibold focus:outline-none hover:underline px-0.5">
                      {selectedCurrency}
                    </button>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="absolute opacity-0 w-0 h-0"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  {/* Period Filter Pill */}
                  <div className="flex items-center rounded-full border border-gray-300 bg-white h-7 text-xs font-medium text-gray-700 px-2">
                    <span className="pl-2 pr-1">Period</span>
                    <span className="mx-1 text-gray-300">|</span>
                    <button className="text-blue-600 font-semibold focus:outline-none hover:underline px-0.5">
                      {getPeriodDateRange(selectedPeriod)}
                    </button>
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="absolute opacity-0 w-0 h-0"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      {periodOptions.map(period => (
                        <option key={period} value={period}>{period}</option>
                      ))}
                    </select>
                  </div>
                  {/* Compare Button Pill */}
                  <button
                    onClick={handleCompareToggle}
                    className="flex items-center gap-1 h-7 px-3 rounded-full border border-dashed border-gray-400 bg-white text-xs font-medium text-gray-700 hover:border-blue-400 hover:text-blue-700 transition-colors focus:outline-none"
                  >
                    <Plus className="w-3 h-3" />
                    Compare
                  </button>
                  {isComparing && (
                    <div className="flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 h-7 text-xs font-medium text-blue-700 relative">
                      <span>vs</span>
                      <span className="mx-1 text-blue-200">|</span>
                      <button
                        className="text-blue-700 font-semibold focus:outline-none hover:underline px-0.5"
                        onClick={() => setShowCompareCalendar((v) => !v)}
                        ref={compareButtonRef}
                      >
                        {comparePeriod}
                      </button>
                      {showCompareCalendar && (
                        <div ref={calendarPopoverRef} className="absolute left-0 top-8 z-20 bg-white rounded-xl shadow-lg p-4">
                          <DayPicker
                            mode="single"
                            selected={parsePeriodToDate(comparePeriod)}
                            month={parsePeriodToDate(comparePeriod)}
                            onSelect={(date: Date | undefined) => {
                              if (date) {
                                setComparePeriod(format(date, 'MMM d, yyyy'));
                              }
                              setShowCompareCalendar(false);
                            }}
                            classNames={{
                              months: "flex flex-col gap-4",
                              month: "w-full",
                              caption: "flex justify-center items-center mb-4 relative",
                              caption_label: "text-lg font-semibold text-gray-900",
                              nav: "flex items-center absolute right-0 top-0 gap-2",
                              nav_button: "h-6 w-6 bg-transparent hover:bg-gray-100 p-1 rounded-md transition-colors duration-300",
                              nav_button_previous: "",
                              nav_button_next: "",
                              table: "w-full border-collapse",
                              head_row: "flex font-medium text-gray-500",
                              head_cell: "w-10 text-center text-xs font-medium",
                              row: "flex w-full mt-2",
                              cell: "w-10 h-10 text-center text-sm p-0 m-0.5 relative",
                              day: "h-10 w-10 p-0 font-normal rounded-full transition-colors duration-200",
                              day_selected: "bg-gray-900 text-white font-semibold",
                              day_today: "border border-gray-400",
                              day_outside: "text-gray-300",
                              day_disabled: "text-gray-300 opacity-50",
                              day_hidden: "invisible",
                            }}
                          />
                        </div>
                      )}
                      <select
                        value={comparePeriod}
                        onChange={(e) => setComparePeriod(e.target.value)}
                        className="absolute opacity-0 w-0 h-0"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {periodOptions
                          .filter(period => period !== selectedPeriod)
                          .map(period => (
                            <option key={period} value={period}>{period}</option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>
                {/* Financial Data */}
                <div>
                  {isComparing ? (
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                      <div className="flex items-center">
                        <span className="text-xs font-semibold text-gray-700 align-middle">General ledger account</span>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-blue-800 text-xs">
                          {getPeriodDateRange(comparePeriod)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-gray-600 text-xs">
                          {getPeriodDateRange(selectedPeriod)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <span className="text-xs font-semibold text-gray-700 align-middle">General ledger account</span>
                      </div>
                      <div className="text-xs text-gray-700 font-normal">
                        {`Period: ${getPeriodDateRange(selectedPeriod)}`}
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Revenue Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Revenue</h3>
                      <div className="space-y-2">
                        <div className={`flex justify-between items-center ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Revenue from sales</span>
                          {isComparing ? (
                            <>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={comparisonData.revenueFromSales}
                                  onClick={() => handleNumberClick('Revenue from sales (comparison)', comparisonData.revenueFromSales)}
                                />
                              </div>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={revenueData.revenueFromSales}
                                  onClick={() => handleNumberClick('Revenue from sales', revenueData.revenueFromSales)}
                                />
                              </div>
                            </>
                          ) : (
                            <ClickableNumber 
                              value={revenueData.revenueFromSales}
                              onClick={() => handleNumberClick('Revenue from sales', revenueData.revenueFromSales)}
                            />
                          )}
                        </div>
                        <div className={`flex justify-between items-center font-medium border-t pt-2 ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Total revenue</span>
                          {isComparing ? (
                            <>
                              <div className="flex items-center justify-end gap-4">
                                <span className="text-base font-medium text-gray-600">$</span>
                                <ClickableNumber 
                                  value={comparisonData.totalRevenue}
                                  onClick={() => handleNumberClick('Total revenue (comparison)', comparisonData.totalRevenue)}
                                  className="font-medium"
                                />
                              </div>
                              <div className="flex items-center justify-end gap-4">
                                <span className="text-base font-medium text-gray-600">$</span>
                                <ClickableNumber 
                                  value={revenueData.totalRevenue}
                                  onClick={() => handleNumberClick('Total revenue', revenueData.totalRevenue)}
                                  className="font-medium"
                                />
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-4">
                              <span className="text-base font-medium text-gray-600">$</span>
                              <ClickableNumber 
                                value={revenueData.totalRevenue}
                                onClick={() => handleNumberClick('Total revenue', revenueData.totalRevenue)}
                                className="font-medium"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contra Revenue Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Contra revenue</h3>
                      <div className="space-y-2">
                        <div className={`flex justify-between items-center ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Bad debt</span>
                          {isComparing ? (
                            <>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={comparisonData.contraRevenue.badDebt}
                                  isNegative
                                  onClick={() => handleNumberClick('Bad debt (comparison)', comparisonData.contraRevenue.badDebt)}
                                />
                              </div>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={revenueData.contraRevenue.badDebt}
                                  isNegative
                                  onClick={() => handleNumberClick('Bad debt', revenueData.contraRevenue.badDebt)}
                                />
                              </div>
                            </>
                          ) : (
                            <ClickableNumber 
                              value={revenueData.contraRevenue.badDebt}
                              isNegative
                              onClick={() => handleNumberClick('Bad debt', revenueData.contraRevenue.badDebt)}
                            />
                          )}
                        </div>
                        <div className={`flex justify-between items-center ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Credit notes</span>
                          {isComparing ? (
                            <>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={comparisonData.contraRevenue.creditNotes}
                                  isNegative
                                  onClick={() => handleNumberClick('Credit notes (comparison)', comparisonData.contraRevenue.creditNotes)}
                                />
                              </div>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={revenueData.contraRevenue.creditNotes}
                                  isNegative
                                  onClick={() => handleNumberClick('Credit notes', revenueData.contraRevenue.creditNotes)}
                                />
                              </div>
                            </>
                          ) : (
                            <ClickableNumber 
                              value={revenueData.contraRevenue.creditNotes}
                              isNegative
                              onClick={() => handleNumberClick('Credit notes', revenueData.contraRevenue.creditNotes)}
                            />
                          )}
                        </div>
                        <div className={`flex justify-between items-center ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Refunds</span>
                          {isComparing ? (
                            <>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={comparisonData.contraRevenue.refunds}
                                  isNegative
                                  onClick={() => handleNumberClick('Refunds (comparison)', comparisonData.contraRevenue.refunds)}
                                />
                              </div>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={revenueData.contraRevenue.refunds}
                                  isNegative
                                  onClick={() => handleNumberClick('Refunds', revenueData.contraRevenue.refunds)}
                                />
                              </div>
                            </>
                          ) : (
                            <ClickableNumber 
                              value={revenueData.contraRevenue.refunds}
                              isNegative
                              onClick={() => handleNumberClick('Refunds', revenueData.contraRevenue.refunds)}
                            />
                          )}
                        </div>
                        <div className={`flex justify-between items-center ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Disputes</span>
                          {isComparing ? (
                            <>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={comparisonData.contraRevenue.disputes}
                                  isNegative
                                  onClick={() => handleNumberClick('Disputes (comparison)', comparisonData.contraRevenue.disputes)}
                                />
                              </div>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={revenueData.contraRevenue.disputes}
                                  isNegative
                                  onClick={() => handleNumberClick('Disputes', revenueData.contraRevenue.disputes)}
                                />
                              </div>
                            </>
                          ) : (
                            <ClickableNumber 
                              value={revenueData.contraRevenue.disputes}
                              isNegative
                              onClick={() => handleNumberClick('Disputes', revenueData.contraRevenue.disputes)}
                            />
                          )}
                        </div>
                        <div className={`flex justify-between items-center ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Voids</span>
                          {isComparing ? (
                            <>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={comparisonData.contraRevenue.voids}
                                  isNegative
                                  onClick={() => handleNumberClick('Voids (comparison)', comparisonData.contraRevenue.voids)}
                                />
                              </div>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={revenueData.contraRevenue.voids}
                                  isNegative
                                  onClick={() => handleNumberClick('Voids', revenueData.contraRevenue.voids)}
                                />
                              </div>
                            </>
                          ) : (
                            <ClickableNumber 
                              value={revenueData.contraRevenue.voids}
                              isNegative
                              onClick={() => handleNumberClick('Voids', revenueData.contraRevenue.voids)}
                            />
                          )}
                        </div>
                        <div className={`flex justify-between items-center font-medium border-t pt-2 ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Total contra revenue</span>
                          {isComparing ? (
                            <>
                              <div className="flex items-center justify-end gap-4">
                                <span className="text-sm text-gray-600">$</span>
                                <ClickableNumber 
                                  value={comparisonData.contraRevenue.total}
                                  isNegative
                                  onClick={() => handleNumberClick('Total contra revenue (comparison)', comparisonData.contraRevenue.total)}
                                  className="font-medium"
                                />
                              </div>
                              <div className="flex items-center justify-end gap-4">
                                <span className="text-sm text-gray-600">$</span>
                                <ClickableNumber 
                                  value={revenueData.contraRevenue.total}
                                  isNegative
                                  onClick={() => handleNumberClick('Total contra revenue', revenueData.contraRevenue.total)}
                                  className="font-medium"
                                />
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600">$</span>
                              <ClickableNumber 
                                value={revenueData.contraRevenue.total}
                                isNegative
                                onClick={() => handleNumberClick('Total contra revenue', revenueData.contraRevenue.total)}
                                className="font-medium"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Net Revenue */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className={`flex justify-between items-center py-2 bg-gray-50 px-4 rounded font-medium ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                        <span className="text-[15px] font-semibold text-gray-900">Net revenue</span>
                        {isComparing ? (
                          <>
                            <div className="flex items-center justify-end gap-4">
                              <span className="text-sm text-gray-600">$</span>
                              <ClickableNumber 
                                value={comparisonData.netRevenue}
                                onClick={() => handleNumberClick('Net revenue (comparison)', comparisonData.netRevenue)}
                                className="font-semibold"
                              />
                            </div>
                            <div className="flex items-center justify-end gap-4">
                              <span className="text-sm text-gray-600">$</span>
                              <ClickableNumber 
                                value={revenueData.netRevenue}
                                onClick={() => handleNumberClick('Net revenue', revenueData.netRevenue)}
                                className="font-semibold"
                              />
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">$</span>
                            <ClickableNumber 
                              value={revenueData.netRevenue}
                              onClick={() => handleNumberClick('Net revenue', revenueData.netRevenue)}
                              className="font-semibold"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expenses Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Expenses</h3>
                      <div className="space-y-2">
                        <div className={`flex justify-between items-center ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Balance adjustments</span>
                          {isComparing ? (
                            <>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={comparisonData.expenses.balanceAdjustments}
                                  isNegative
                                  onClick={() => handleNumberClick('Balance adjustments (comparison)', comparisonData.expenses.balanceAdjustments)}
                                />
                              </div>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={revenueData.expenses.balanceAdjustments}
                                  isNegative
                                  onClick={() => handleNumberClick('Balance adjustments', revenueData.expenses.balanceAdjustments)}
                                />
                              </div>
                            </>
                          ) : (
                            <ClickableNumber 
                              value={revenueData.expenses.balanceAdjustments}
                              isNegative
                              onClick={() => handleNumberClick('Balance adjustments', revenueData.expenses.balanceAdjustments)}
                            />
                          )}
                        </div>
                        <div className={`flex justify-between items-center font-medium border-t pt-2 ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Total expenses</span>
                          {isComparing ? (
                            <>
                              <div className="flex items-center justify-end gap-4">
                                <span className="text-sm text-gray-600">$</span>
                                <ClickableNumber 
                                  value={comparisonData.expenses.total}
                                  isNegative
                                  onClick={() => handleNumberClick('Total expenses (comparison)', comparisonData.expenses.total)}
                                  className="font-medium"
                                />
                              </div>
                              <div className="flex items-center justify-end gap-4">
                                <span className="text-sm text-gray-600">$</span>
                                <ClickableNumber 
                                  value={revenueData.expenses.total}
                                  isNegative
                                  onClick={() => handleNumberClick('Total expenses', revenueData.expenses.total)}
                                  className="font-medium"
                                />
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600">$</span>
                              <ClickableNumber 
                                value={revenueData.expenses.total}
                                isNegative
                                onClick={() => handleNumberClick('Total expenses', revenueData.expenses.total)}
                                className="font-medium"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Gains and Losses Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Gains and losses</h3>
                      <div className="space-y-2">
                        <div className={`flex justify-between items-center ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Recoverables</span>
                          {isComparing ? (
                            <>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={comparisonData.gainsAndLosses.recoverables}
                                  onClick={() => handleNumberClick('Recoverables (comparison)', comparisonData.gainsAndLosses.recoverables)}
                                />
                              </div>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={revenueData.gainsAndLosses.recoverables}
                                  onClick={() => handleNumberClick('Recoverables', revenueData.gainsAndLosses.recoverables)}
                                />
                              </div>
                            </>
                          ) : (
                            <ClickableNumber 
                              value={revenueData.gainsAndLosses.recoverables}
                              onClick={() => handleNumberClick('Recoverables', revenueData.gainsAndLosses.recoverables)}
                            />
                          )}
                        </div>
                        <div className={`flex justify-between items-center ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Foreign exchange loss</span>
                          {isComparing ? (
                            <>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={comparisonData.gainsAndLosses.foreignExchangeLoss}
                                  isNegative
                                  onClick={() => handleNumberClick('Foreign exchange loss (comparison)', comparisonData.gainsAndLosses.foreignExchangeLoss)}
                                />
                              </div>
                              <div className="text-right">
                                <ClickableNumber 
                                  value={revenueData.gainsAndLosses.foreignExchangeLoss}
                                  isNegative
                                  onClick={() => handleNumberClick('Foreign exchange loss', revenueData.gainsAndLosses.foreignExchangeLoss)}
                                />
                              </div>
                            </>
                          ) : (
                            <ClickableNumber 
                              value={revenueData.gainsAndLosses.foreignExchangeLoss}
                              isNegative
                              onClick={() => handleNumberClick('Foreign exchange loss', revenueData.gainsAndLosses.foreignExchangeLoss)}
                            />
                          )}
                        </div>
                        <div className={`flex justify-between items-center font-medium border-t pt-2 ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                          <span className="text-[15px] text-gray-700 ml-4">Total gains and losses</span>
                          {isComparing ? (
                            <>
                              <div className="flex items-center justify-end gap-4">
                                <span className="text-sm text-gray-600">$</span>
                                <ClickableNumber 
                                  value={comparisonData.gainsAndLosses.total}
                                  isNegative={comparisonData.gainsAndLosses.total < 0}
                                  onClick={() => handleNumberClick('Total gains and losses (comparison)', comparisonData.gainsAndLosses.total)}
                                  className="font-medium"
                                />
                              </div>
                              <div className="flex items-center justify-end gap-4">
                                <span className="text-sm text-gray-600">$</span>
                                <ClickableNumber 
                                  value={revenueData.gainsAndLosses.total}
                                  isNegative={revenueData.gainsAndLosses.total < 0}
                                  onClick={() => handleNumberClick('Total gains and losses', revenueData.gainsAndLosses.total)}
                                  className="font-medium"
                                />
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600">$</span>
                              <ClickableNumber 
                                value={revenueData.gainsAndLosses.total}
                                isNegative={revenueData.gainsAndLosses.total < 0}
                                onClick={() => handleNumberClick('Total gains and losses', revenueData.gainsAndLosses.total)}
                                className="font-medium"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Net Income */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className={`flex justify-between items-center py-3 bg-blue-50 px-4 rounded-lg font-bold ${isComparing ? 'grid grid-cols-3 gap-4' : ''}`}>
                        <span className="text-[15px] font-bold text-gray-900">Net income</span>
                        {isComparing ? (
                          <>
                            <div className="flex items-center justify-end gap-4">
                              <span className="text-sm text-gray-600">$</span>
                              <ClickableNumber 
                                value={comparisonData.netIncome}
                                isNegative={comparisonData.netIncome < 0}
                                onClick={() => handleNumberClick('Net income (comparison)', comparisonData.netIncome)}
                                className="text-base font-bold"
                              />
                            </div>
                            <div className="flex items-center justify-end gap-4">
                              <span className="text-sm text-gray-600">$</span>
                              <ClickableNumber 
                                value={revenueData.netIncome}
                                isNegative={revenueData.netIncome < 0}
                                onClick={() => handleNumberClick('Net income', revenueData.netIncome)}
                                className="text-base font-bold"
                              />
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">$</span>
                            <ClickableNumber 
                              value={revenueData.netIncome}
                              isNegative={revenueData.netIncome < 0}
                              onClick={() => handleNumberClick('Net income', revenueData.netIncome)}
                              className="text-base font-bold"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div> {/* End of Financial Data */}
                </div> {/* End of Main Card Content */}
              </div> {/* End of Main Card */}
            </div> {/* End of bg-gray-50 rounded-xl p-4 */}
          </div> {/* End of flex-1 flex flex-col pl-4 */}
        </div> {/* End of flex items-start gap-4 */}
      </div> {/* End of pt-2 pl-4 pb-16 w-full max-w-[1400px] mx-auto */}
    </div>
  );
}