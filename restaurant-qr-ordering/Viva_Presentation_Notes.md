# Viva Presentation Notes: QR Code Restaurant Ordering System

*Use these notes to prepare for your final year project presentation and viva.*

## 1. Project Pitch (30 seconds)
"Good morning examiners. My project is the **QR Code Restaurant Ordering System**. It solves the problem of long wait times and wrong orders in restaurants. Customers simply scan a QR code on their table to view the menu and place an order. The order instantly pops up on the Kitchen Display System (KDS) for the chefs. It is built using Next.js, React, Tailwind CSS, and Prisma ORM."

## 2. Common Examiner Questions & Answers

**Q1: Why did you choose Next.js instead of standard React?**
*Answer:* I chose Next.js because it provides full-stack capabilities in a single repository. I used the Next.js App Router for server-side rendering, which makes the digital menu load instantly on mobile phones. It also allowed me to build the API routes (backend) seamlessly without needing a separate Node.js/Express server.

**Q2: How does the database work?**
*Answer:* I used Prisma ORM with a SQLite database. The schema has 4 main tables: Categories, MenuItems, Orders, and OrderItems. When a customer adds items to their cart and checks out, a new Order is created, and all the items in their cart are saved as OrderItems linked to that specific Order and Table Number.

**Q3: How does the Kitchen Display System (KDS) stay updated?**
*Answer:* The KDS page uses a `setInterval` hook in React to poll the `/api/orders` endpoint every 3 seconds. It categorizes the orders based on their state: RECEIVED, PREPARING, and READY. When a chef clicks "Start Preparing", it sends a PATCH request to the API to update the database state, which instantly moves the order to the next column on the screen.

**Q4: How did you handle state management for the shopping cart?**
*Answer:* For the cart, I used React's `useState` hook. The cart is stored as an object where the keys are the `menuItem.id` and the values contain the item details and quantity. This makes it O(1) time complexity to check if an item is already in the cart and update its quantity, which is highly efficient.

## 3. Demo Flow
1. Start the server using `run.bat`.
2. Open the **Customer Menu** and enter "Table 4".
3. Open a second tab and go to `/kds` to show the **Kitchen Display System**.
4. Go back to the customer menu, add 3 items to the cart, and place the order.
5. Quickly switch to the KDS tab to show the examiners how the order instantly appears in the "New Orders" column.
6. Click "Start Preparing" and "Mark Ready" to show the flow.
