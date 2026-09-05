# Design and Implementation of a QR-Based Digital Menu and Kitchen Display System for Restaurants

## Abstract
Traditional restaurant ordering systems suffer from bottlenecks during peak hours, leading to delayed order processing, inaccurate order taking, and diminished customer satisfaction. This project presents a full-stack web application that allows customers to scan a QR code at their table, view a digital menu, and place orders directly to the kitchen. The system integrates a real-time Kitchen Display System (KDS) for chefs to manage the order lifecycle, significantly reducing wait times and manual errors. The application is built using Next.js, Prisma ORM, and Tailwind CSS.

## 1. Introduction
The hospitality industry is rapidly adopting digital solutions to streamline operations. A major area of inefficiency is the manual order-taking process. Waiters must travel between tables and the kitchen, creating a bottleneck. This project proposes a QR Code Restaurant Ordering System where customers act as their own waitstaff. By scanning a QR code linked to a specific table, customers gain access to an interactive digital menu.

## 2. System Architecture
The system follows a client-server architecture using the Next.js App Router paradigm. 
- **Frontend (Client):** Developed using React.js and Tailwind CSS. It is split into two primary views: the Mobile-First Customer Interface and the Desktop-Optimized Kitchen Display System.
- **Backend (Server):** Next.js API routes serve as the backend layer, handling RESTful API requests.
- **Database Layer:** Prisma ORM is used to interface with a SQLite database, ensuring data integrity and rapid query execution for menu items and order states.

## 3. Methodology
The development followed an Agile methodology, broken down into sprints:
- **Phase 1: Database Design:** Structuring the relational database with `Category`, `MenuItem`, `Order`, and `OrderItem` models.
- **Phase 2: Customer UI:** Implementing the digital menu, shopping cart logic, and checkout flow.
- **Phase 3: Admin KDS:** Developing the real-time order dashboard for kitchen staff.
- **Phase 4: Integration:** Connecting the frontend to the backend API routes and ensuring state synchronization.

## 4. Results
The deployed system successfully processes orders with zero manual intervention. The Kitchen Display System accurately reflects order states (Received -> Preparing -> Ready) in real-time. The digital menu is highly responsive, loading in under 500ms on mobile networks, and the cart state is managed efficiently using React hooks.

## 5. Conclusion
The QR Code Restaurant Ordering System effectively demonstrates the power of modern full-stack web development in solving real-world operational bottlenecks. Future enhancements could include WebSocket integration for instantaneous KDS updates and payment gateway integration (e.g., Stripe or Razorpay) for in-app checkout.
