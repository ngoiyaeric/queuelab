# Build stage
FROM python:3.11-slim AS builder

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Runtime stage
FROM python:3.11-slim AS runtime

WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN addgroup --system --gid 1001 python &&     adduser --system --uid 1001 --gid 1001 fastapi

# Copy installed dependencies from builder
COPY --from=builder --chown=fastapi:python /root/.local /home/fastapi/.local

# Copy application code
COPY --chown=fastapi:python . .

# Set environment variables
ENV PATH=/home/fastapi/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1

USER fastapi

EXPOSE 8000

# Run with gunicorn for production
# Using 2 workers as a sane default for small instances
CMD ["gunicorn", "app.main:app", "--workers", "2", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000", "--timeout", "0"]
