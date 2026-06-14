# FastAPI Backend

This is the foundational FastAPI backend for the QCX Location Intelligence project.

## Local Development

### Prerequisites

- Python 3.11+
- Virtual environment

### Setup

1. **Create and activate a virtual environment:**

   ```bash
   # Create a venv (e.g., using venv module)
   # Activate it
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**

   Copy `.env.example` to `.env` and update as needed.

   ```bash
   cp .env.example .env
   ```

4. **Run the server:**

   ```bash
   uvicorn app.main:app --reload
   ```

The API will be available at `http://localhost:8000`.

## API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Key Endpoints

- `GET /health`: Health check endpoint.
