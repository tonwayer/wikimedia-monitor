### `README.md`

# Wikimedia Event Stream Monitor

This project is a web-based user interface for monitoring the Wikimedia event stream in real-time. It allows users to visualize edits as they come in, filter the stream by various aspects, and mark edits as seen.

## Features

- Real-time visualization of Wikimedia edits.
- Filter controls for domain, namespace, minor edits, bot edits, regex over title, and anonymous edits.
- Ability to mark edits as seen to remove them from the list.
- Auto-remove old events to prevent UI and state bloat.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/wikimedia-monitor.git
   cd wikimedia-monitor
   ```

2. **Install server dependencies:**
   ```bash
   npm install
   ```

3. **Navigate to the `client` directory and install dependencies:**
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. **Build the React application:**
   ```bash
   cd client
   npm run build
   ```

2. **Start the server:**
   ```bash
   cd ..
   node server.js
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

### Project Structure

- **server.js:** The main server file using Express and WebSocket to handle real-time data streaming.
- **client/:** The React application.
  - **src/App.js:** Main React component.
  - **src/FilterControls.js:** Component for filter controls.
  - **src/EditList.js:** Component for displaying the list of edits.
  - **src/App.css:** Styling for the React components.

### Deployment

To deploy the application on AWS EC2:

1. **Launch an EC2 instance and SSH into it:**
   ```bash
   ssh -i my-key-pair.pem ec2-user@your-ec2-public-dns
   ```

2. **Install Node.js and Git:**
   ```bash
   sudo yum update -y
   curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
   sudo yum install -y nodejs git
   ```

3. **Clone the repository on the EC2 instance and navigate into the directory:**
   ```bash
   git clone https://github.com/yourusername/wikimedia-monitor.git
   cd wikimedia-monitor
   ```

4. **Install server dependencies:**
   ```bash
   npm install
   ```

5. **Navigate to the `client` directory and install dependencies:**
   ```bash
   cd client
   npm install
   ```

6. **Build the React application:**
   ```bash
   npm run build
   ```

7. **Start the server:**
   ```bash
   cd ..
   node server.js
   ```

8. **Ensure port 80 is open in your security group to allow HTTP traffic.**
