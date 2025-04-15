# 📦 Order Tracking System

A full-stack application for managing and tracking customer orders.

---

## 🌟 Features

- Customers place orders with multiple products
- Product categories:
  - 💻 Computer → +2 points
  - ❤️ Health → +1 point
  - 📺 Audio/Video → +0.5 point
  - 📦 Others → +0.25 point
- Reward system:
  - 25+ points → 40% discount
  - Points reset after discount
- Personal customers must prepay (poor credit rating)
- Corporate customers have credit ratings + credit limit checks
- Staged shipping if product stock is partial

---

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- H2 (in-memory DB)
- Lombok
- Maven

### Frontend
- React 19
- Fetch API for REST calls
- `react-loader-spinner` for loading indicators

---

## 🚀 How to Run

### Backend
```bash
git clone https://github.com/mollanegash/ordertrackingsystem.git
cd ordertrackingsystem
./mvnw spring-boot:run