#!/bin/bash

# Exit on error
set -e

echo "Starting environment setup..."

# 1. Node.js environment
echo "Setting up Node.js environment..."
if command -v npm &> /dev/null; then
    npm install
    echo "Node.js dependencies installed."
else
    echo "Error: npm is not installed. Please install Node.js."
    exit 1
fi

# 2. Python environment
echo "Setting up Python environment..."
if command -v python3 &> /dev/null; then
    python3 -m venv .venv
    source .venv/bin/activate
    pip install --upgrade pip
    pip install google-genai
    echo "Python environment (.venv) created and dependencies installed."
else
    echo "Error: python3 is not installed. Please install Python 3."
    exit 1
fi

echo "Environment setup complete!"
echo "To activate the Python environment, run: source .venv/bin/activate"
