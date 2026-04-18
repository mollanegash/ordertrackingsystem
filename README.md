# 📦 Order Tracking System

A full-stack order management platform built with Spring Boot and React.  
This project demonstrates backend system design, business rule enforcement, and full-stack integration in a production-style architecture.

---

## 🚀 Core Features

- Create and manage customer orders with multiple products
- Business-driven reward system with dynamic discount logic
- Customer types:
  - Personal (prepaid required)
  - Corporate (credit limit + rating validation)
- Staged shipping for partially available inventory
- Search, pagination, and sorting for order management
- Responsive frontend with real-time API interaction

---

## 🧠 System Architecture

- **Frontend:** React SPA (REST client)
- **Backend:** Spring Boot REST API
- **Data Layer:** Spring Data JPA (H2 for development)
- **Deployment:** Docker containerization

### Backend Design

- Layered architecture:
  - Controller → Service → Repository
- Business rules encapsulated in service layer
- RESTful API design with clean separation of concerns
- DTO-based request handling

---

## ⚙️ Tech Stack

### Backend
- Java 17  
- Spring Boot 3  
- Spring Data JPA  
- H2 Database  
- Maven  

### Frontend
- React  
- Fetch API  
- CSS  

### DevOps
- Docker  

---

## 🧩 Business Logic Highlights

- **Reward System**
  - Computer → +2 points  
  - Health → +1 point  
  - Audio/Video → +0.5 point  
  - Others → +0.25 point  
  - 25+ points → 40% discount  

- **Customer Rules**
  - Personal → must prepay  
  - Corporate → validated against credit limit  

- **Order Processing**
  - Supports partial fulfillment (staged shipping)
  - Handles inventory constraints

---

## 🚀 Scalability & Design Considerations

For production-scale systems, this architecture can be extended with:

- Replace H2 with PostgreSQL or MySQL
- Introduce caching (Redis) for frequent queries
- Use message queues (Kafka/RabbitMQ) for order processing
- Add authentication/authorization (JWT, OAuth2)
- Implement distributed services for order, inventory, and billing

---

## ▶️ Running the Application

```bash
git clone https://github.com/mollanegash/ordertrackingsystem.git
cd ordertrackingsystem
./mvnw spring-boot:run
