# VideoPorterto Backend

This is a simple server that serves as the backend for the VideoPorter application. It is built using Node.js and Express. The main functionality of the server is to authentication and in a future version it will also serve as a database for the application.

## Installation

1. Clone the repository: `git clone https://github.com/<your-username>/videoporteroback.git`
2. Navigate to the project directory: `cd videoporteroback`
3. Install dependencies: `npm install`
4. Make sure you have a `.env` file in the root of the project with the following environment variables:
   - `PORT`: The port on which the server will run.
   - `AGORA_APP_ID`: The App ID of the Agora project.
   - `AGORA_APP_CERTIFICATE`: The App Certificate of the Agora project.

## Usage

To start the server, run the following command:

```
npm start
```

## API Endpoints

- `GET /rtcToken`: Get the token and the uid for a user to join a video call.
