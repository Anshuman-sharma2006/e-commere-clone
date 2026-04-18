## Technology Used 
| Technology | Purpose | Why it was Chosen |
| :--- | :--- | :--- |
| **React 19** | Frontend Library | Provides the most advanced rendering capabilities and component-based UI management. |
| **Next.js 16.2** | Meta-Framework | Enables server-side rendering, API routing, and optimized builds for a superior user experience. |
| **Prisma** | ORM | Offers type-safe database access and simplified schema migrations for SQLite and PostgreSQL. |
| **Stripe** | Payment Processing | The industry standard for secure, reliable, and global financial transactions. |
| **Tailwind CSS 4** | Styling | A utility-first CSS framework that allows for rapid, responsive UI development with minimal overhead. |
| **PostgreSQL** | Production Database | A powerful, open-source relational database for handling complex data relationships and high loads. |
| **SQLite** | Local Database | Perfect for local development and rapid prototyping with zero-configuration requirements. |
| **React Email** | Communication | Enables the creation of high-quality, responsive email templates using familiar React components. |

---
## 📁 Project Structure

The project follows a highly organized, modular directory structure designed for maintainability and clear separation of concerns.

```
project-root/
├── 📁 prisma/                   # Database configuration and migrations
│   ├── 📄 schema.prisma         # Primary data models (Product, Order, User)
│   └── 📁 migrations/           # Version-controlled database changes
├── 📁 src/                      # Main source code
│   ├── 📁 app/                  # Next.js App Router directory
│   │   ├── 📁 (customerFacing)/ # Public-facing store and user routes
│   │   ├── 📁 admin/            # Protected administrative dashboard
│   │   ├── 📁 api/              # Backend API routes and webhooks
│   │   └── 📁 generated/        # Auto-generated Prisma client and types
│   ├── 📁 components/           # Reusable UI components
│   │   ├── 📄 nav.tsx           # Global navigation system
│   │   ├── 📄 ProductCard.tsx   # Product display logic
│   │   └── 📁 ui/               # Base UI elements (buttons, inputs, etc.)
│   ├── 📁 email/                # React Email templates
│   │   ├── 📄 PurchaseReceipt.tsx # Email sent after successful transaction
│   │   └── 📄 OrderHistory.tsx    # User order summary email
│   ├── 📁 lib/                  # Core utility libraries
│   │   ├── 📄 stripe.ts         # Stripe configuration and logic
│   │   ├── 📄 cache.tsx          # Data caching strategies
│   │   └── 📄 formatter.tsx      # Date and currency formatting
│   └── 📄 proxy.ts              # Network and request handling
├── 📁 public/                   # Static assets and media
├── 📁 db/                       # Database initialization logic
├── 📄 components.json           # UI component configuration
├── 📄 next.config.ts            # Next.js framework settings
├── 📄 package.json              # Dependency and script management
└── 📄 tsconfig.json             # TypeScript compiler configuration
```

---

## 🚀 Getting Started

Follow these steps to set up  in your local development environment.

### Prerequisites

- **Node.js:** Latest LTS version recommended
- **NPM:** Version 8 or higher
- **TypeScript:** Familiarity with typed JavaScript

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/documentation-master-ai.git
   cd documentation-master-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```


4. **Launch the email preview server** (Optional)
   ```bash
   npm run email
   ```
5.**Use Stripe CLI to forward webhook events to your local Next.js route** 
```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
6. **Start the development server**
   ```bash
   npm run dev
   ```
The application will now be running at `http://localhost:3000`.

---


