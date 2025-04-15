# Order Tracking System

A Spring Boot application that simulates a basic **Order Tracking System** with support for different types of customers, product categorization, and reward logic.

## 📦 Features

- Customers can place orders containing multiple products.
- Products have categories (e.g., computer, health, audio/video, others).
- Order processing handles partial stock and staged shipping.
- Tracks product shipping status and date.
- Differentiates between:
  - **Personal Customers** (default: poor credit rating, must prepay via credit card)
  - **Corporate Customers** (credit rating: excellent/good/poor, with credit limits)
- Applies rules for prepayment based on customer type and credit status.
- Reward points system:
  - 2 points per computer-related product
  - 1 point per health-related product
  - 0.5 point per audio/video product
  - 0.25 point for others
- Customers who accumulate **25+ points** get a **40% discount** on the next order.
- After discount is applied, points reset to **0**.

## 🛠️ Tech Stack

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- H2 (in-memory database)
- Lombok
- Maven

## 🚀 How to Run

```bash
# Clone the repository
git clone https://github.com/mollanegash/ordertrackingsystem.git

# Navigate into the project directory
cd ordertrackingsystem

# Run the application
./mvnw spring-boot:run
