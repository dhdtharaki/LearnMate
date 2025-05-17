FROM python:3.10-slim

WORKDIR /app

# Install system dependencies (if needed)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install heavy packages efficiently
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir torch tensorflow xgboost

# Copy and install the rest of the requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
