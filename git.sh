#!/bin/bash

# Script name: gitpush.sh

# Exit immediately if a command exits with a non-zero status
set -e

# Commit message as argument
commit_message=${1:-"Updated the css file"}

# Run Git commands
git add .
git commit -m "$commit_message"
git push origin main

echo "✅ Changes pushed successfully on GitHub with message: '$commit_message'"

