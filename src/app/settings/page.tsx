'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  Info,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Clock,
  BookOpen,
  Calculator
} from 'lucide-react';

export default function SettingsPage() {
  const [accountingPeriod, setAccountingPeriod] = useState('4-4-5');
  const [startDate, setStartDate] = useState('Jan 01,2025');
  const [closeBooks, setCloseBooks] = useState('automatically');
  const [amortizeBy, setAmortizeBy] = useState('evenly');
  const [proration, setProration] = useState('first-last');
  const [catchUpRevenue, setCatchUpRevenue] = useState(false);
  const [recordRecoveredRevenue, setRecordRecoveredRevenue] = useState(true);

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Fixed */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 h-full z-20">
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex h-10 items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="text-gray-900 font-medium">Cactus Practice</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <span className="text-sm">Home</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <span className="text-sm">Balances</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <span className="text-sm">Transactions</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <span className="text-sm">Directory</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <span className="text-sm">Product catalog</span>
            </div>
            
            {/* Shortcuts Section */}
            <div className="pt-4">
              <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Shortcuts</div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  <span className="text-sm">Fraud tools</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  <span className="text-sm">Terminal</span>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="pt-4">
              <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Products</div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  <span className="text-sm">Connect</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  <span className="text-sm">Payments</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  <span className="text-sm">Billing</span>
                </div>
                
                {/* Reporting Section */}
                <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  <span className="text-sm">Reporting</span>
                </div>
                <div className="ml-8 space-y-1">
                  <div className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Overview</div>
                  <div className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Metrics</div>
                  <div className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Reports</div>
                  <div className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded cursor-pointer font-medium">Revenue Recognition</div>
                  <div className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Sigma</div>
                  <div className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Data management</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <span className="text-sm">More</span>
            </div>
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            <div className="w-5 h-5 bg-gray-400 rounded"></div>
            <span className="text-sm">Developers</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64 h-screen">
        {/* Top Header - Fixed */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0 z-30">
          <div className="flex h-10 items-center gap-4">
            <div className="flex h-10 items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-80"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <button className="text-gray-600 hover:text-gray-900 text-sm">Developers</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm">Sandboxes</button>
              <button className="text-gray-400 hover:text-gray-600">
                <Info className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">T</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Header - Fixed */}
        <div className="bg-white px-6 py-6 border-b border-gray-200 flex-shrink-0 z-20">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <button 
                  onClick={handleBackClick}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Settings
                </button>
                <ChevronRight className="w-4 h-4" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">Revenue Recognition</h1>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> Changes to your settings impact all accounting periods and may take up to 24 hours to process. 
                  Adjustments made in closed periods will show up as corrections in the current period.{' '}
                  <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                    You can reopen past periods to avoid this.
                  </button>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="py-8">
            <div className="px-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Settings */}
                <div className="lg:col-span-3 space-y-8">
                  
                  {/* Accounting close section */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="border-b border-gray-200 pb-4 mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">Accounting close</h2>
                      <p className="text-sm text-gray-600 mt-1">Configure how your accounting periods are structured and closed</p>
                    </div>
                    
                    {/* Accounting period */}
                    <div className="mb-8">
                      <h3 className="text-base font-semibold text-gray-900 mb-3">Accounting period</h3>
                      <div className="space-y-4">
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="accounting-period"
                            value="calendar"
                            checked={accountingPeriod === 'calendar'}
                            onChange={(e) => setAccountingPeriod(e.target.value)}
                            className="w-4 h-4 text-blue-600 mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-1">Calendar month</div>
                            <div className="text-sm text-gray-600">Aligns with calendar months.</div>
                          </div>
                        </label>
                        
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="accounting-period"
                            value="4-4-5"
                            checked={accountingPeriod === '4-4-5'}
                            onChange={(e) => setAccountingPeriod(e.target.value)}
                            className="w-4 h-4 text-blue-600 mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-1">4-4-5</div>
                            <div className="text-sm text-gray-600">Divides the year into 4 quarters, each with 3 periods of 4, 4, 5 weeks.</div>
                          </div>
                        </label>
                      </div>

                      {/* Start date - Only show when 4-4-5 is selected */}
                      {accountingPeriod === '4-4-5' && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Starts from</label>
                              <input
                                type="text"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-40"
                                placeholder="Jan 01, 2025"
                              />
                            </div>
                            <button className="mt-6 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg font-medium transition-colors border border-blue-200">
                              Preview periods
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Close books */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-semibold text-gray-900 mb-3">Close books</h3>
                      <div className="space-y-4">
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="close-books"
                            value="automatically"
                            checked={closeBooks === 'automatically'}
                            onChange={(e) => setCloseBooks(e.target.value)}
                            className="w-4 h-4 text-blue-600 mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-1">Automatically</div>
                            <div className="text-sm text-gray-600">Books are automatically closed at the end of each period.</div>
                          </div>
                        </label>
                        
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="close-books"
                            value="manually"
                            checked={closeBooks === 'manually'}
                            onChange={(e) => setCloseBooks(e.target.value)}
                            className="w-4 h-4 text-blue-600 mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-1">Manually</div>
                            <div className="text-sm text-gray-600">You decide when you want to close your books.</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Revenue settings section */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="border-b border-gray-200 pb-4 mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">Revenue settings</h2>
                      <p className="text-sm text-gray-600 mt-1">Configure how revenue is recognized and distributed over time</p>
                    </div>
                    
                    {/* Amortize by */}
                    <div className="mb-8">
                      <h3 className="text-base font-semibold text-gray-900 mb-3">Amortize by</h3>
                      <div className="space-y-4">
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="amortize-by"
                            value="millisecond"
                            checked={amortizeBy === 'millisecond'}
                            onChange={(e) => setAmortizeBy(e.target.value)}
                            className="w-4 h-4 text-blue-600 mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Millisecond</div>
                          </div>
                        </label>
                        
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="amortize-by"
                            value="day"
                            checked={amortizeBy === 'day'}
                            onChange={(e) => setAmortizeBy(e.target.value)}
                            className="w-4 h-4 text-blue-600 mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Day</div>
                          </div>
                        </label>
                        
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="amortize-by"
                            value="evenly"
                            checked={amortizeBy === 'evenly'}
                            onChange={(e) => setAmortizeBy(e.target.value)}
                            className="w-4 h-4 text-blue-600 mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-2">Evenly by month</div>
                            
                            {amortizeBy === 'evenly' && (
                              <div className="mt-3">
                                <select 
                                  value={proration}
                                  onChange={(e) => setProration(e.target.value)}
                                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                                >
                                  <option value="first-last">First and last month prorated</option>
                                  <option value="all-months">All months equal</option>
                                </select>
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Additional options */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-semibold text-gray-900 mb-4">Additional options</h3>
                      <div className="space-y-6">
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={catchUpRevenue}
                            onChange={(e) => setCatchUpRevenue(e.target.checked)}
                            className="w-4 h-4 text-blue-600 mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-1">Catch-up revenue</div>
                            <div className="text-sm text-gray-600">Record money earned from past services in the current period, even if it wasn't billed at the time.</div>
                          </div>
                        </label>

                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={recordRecoveredRevenue}
                            onChange={(e) => setRecordRecoveredRevenue(e.target.checked)}
                            className="w-4 h-4 text-blue-600 mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-1">Record recovered revenue as gains</div>
                            <div className="text-sm text-gray-600">Treat recovered revenue from unpaid invoices, refund failures, and resolved disputes as gains.</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resources Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg group transition-colors border border-transparent hover:border-gray-200">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm text-gray-700 group-hover:text-gray-900">
                            What happens to entries in closed accounting periods when you change settings?
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        </div>
                      </button>
                      
                      <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg group transition-colors border border-transparent hover:border-gray-200">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm text-gray-700 group-hover:text-gray-900">
                            How is revenue amortized by Stripe?
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        </div>
                      </button>
                      
                      <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg group transition-colors border border-transparent hover:border-gray-200">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm text-gray-700 group-hover:text-gray-900">
                            What happens to the extra days in a 4-4-5 calendar?
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 