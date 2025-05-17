# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Install system dependencies (if needed, e.g., for psycopg2 or similar)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the Python files into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port your Flask app runs on (default 5000)
EXPOSE 5000

# Set environment variable to tell Flask to run in production
ENV FLASK_ENV=production

# Run the application
CMD ["python", "app.py"] 
