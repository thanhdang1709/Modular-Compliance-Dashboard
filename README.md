# Modular Compliance Dashboard

## Project Description
The goal of this project is to create a Modular Compliance Dashboard using React, Zustand for state management, and AWS Amplify for authentication. This dashboard focuses on displaying compliance-related information in a modular and user-friendly way.

## Features
1. **Microfrontend Architecture**:
   - The dashboard is divided into distinct modules: Task Overview, Compliance Status, and Recent Activity.
   - Each module is independently developed, deployable, and has its own state management.

2. **Task Overview Module**:
   - Displays a list of compliance tasks with title, due date, assigned person, and status.
   - Supports sorting and filtering of tasks.

3. **Compliance Status Module**:
   - Presents a visual overview of overall compliance status using a pie chart or bar graph.
   - Displays metrics like percentage of completed tasks and overdue tasks.

4. **Recent Activity Module**:
   - Shows a log of recent actions related to compliance tasks with timestamps, action descriptions, and users involved.

5. **Authentication**:
   - Uses AWS Amplify to set up user authentication with Cognito.
   - Protects dashboard access behind a login screen.

## Technical
- AWS Amplify
- React
- TailwindCss, Shadcn UI.
- Zustand for state management
- AWS Cognito for authentication

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- AWS account and Amplify CLI configured

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/thanhdang1709/Modular-Compliance-Dashboard.git
   cd modular-compliance-dashboard

2. **Install dependencies**:
    ```bash
    npm install

### AWS Amplify Configuration
1. Initialize Amplify:
    ```bash
    amplify init

2. Add authentication:

    ```bash
    amplify add auth
    amplify add api

3. Push the changes to AWS:
    ```bash
    amplify push

### Running the Application

1. Start with lerna
    ```bash
    lerna run start

2. Open Browser
    ```bash
    # https://localhost:3000 (main)
    # https://localhost:3001 (task-overview)
    # https://localhost:3002 (compliance-status)
    # https://localhost:3003 (recent-activity)