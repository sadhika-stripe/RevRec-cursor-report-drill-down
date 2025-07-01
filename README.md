# Revenue Recognition Dashboard

A modern, interactive financial dashboard that recreates the Stripe Revenue Recognition interface with clickable numbers and comprehensive financial reporting.

## Features

- **Interactive Financial Data**: All numbers are clickable and show detailed information
- **Stripe-inspired Design**: Clean, professional interface matching Stripe's design language
- **Comprehensive Reporting**: Includes revenue, contra revenue, expenses, and gains/losses
- **Responsive Layout**: Works seamlessly across desktop and mobile devices
- **Real-time Updates**: Mock data with timestamp indicators
- **Export Functionality**: Download reports in various formats

## Key Components

### Revenue Sections
- **Revenue from Sales**: Primary income tracking
- **Contra Revenue**: Bad debt, credit notes, refunds, disputes, and voids
- **Net Revenue**: Calculated automatically with info tooltips
- **Expenses**: Balance adjustments and operational costs
- **Gains and Losses**: Recoverables and foreign exchange impacts
- **Net Income**: Final profit/loss calculation

### Interactive Features
- Click any number to see detailed breakdown
- Currency selection (USD, EUR, GBP)
- Period filtering (Last month, quarter, year)
- Comparison tools
- Export to various formats

### Navigation
- Sidebar with report types (Balance sheet, Income statement, etc.)
- Tab navigation for different views
- Feedback system for user input

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Modern icon library
- **Responsive Design**: Mobile-first approach

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main Revenue Recognition page
│   └── globals.css         # Global styles
└── components/             # Reusable components (future expansion)
```

## Customization

### Adding New Financial Data
Update the `revenueData` object in `page.tsx` to modify the financial figures:

```typescript
const revenueData = {
  totalRevenue: 45000.00,
  revenueFromSales: 45000.00,
  contraRevenue: {
    badDebt: 1400.25,
    // ... other values
  },
  // ... other sections
};
```

### Styling
The project uses Tailwind CSS for styling. Key design tokens:
- Primary colors: Blue (600, 700) for interactive elements
- Gray scale: 50-900 for text and backgrounds
- Orange accent: 500 for branding
- Hover states: Blue-50 backgrounds with blue-700 text

### Click Handlers
Customize the click behavior by modifying the `handleNumberClick` function:

```typescript
const handleNumberClick = (label: string, value: number) => {
  // Custom logic here
  console.log(`Clicked ${label}: $${value}`);
};
```

## Future Enhancements

- [ ] Real API integration
- [ ] Advanced filtering and search
- [ ] Data visualization charts
- [ ] Export to PDF/Excel
- [ ] User authentication
- [ ] Multi-company support
- [ ] Historical data comparison
- [ ] Custom report builder

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for demonstration purposes and recreates the Stripe dashboard interface for educational purpose.
