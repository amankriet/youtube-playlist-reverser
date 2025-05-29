# 🎵 YouTube Playlist Reverser

A full-stack web application that allows users to connect their YouTube account, input a playlist URL, and play videos in **reverse order** using the YouTube Data API v3.

---

## 🛠️ Tech Stack

- ⚛️ React + TypeScript + Vite
- 🎨 Tailwind CSS
- 🚀 FastAPI (Python)
- 🔐 Google OAuth 2.0
- 📺 YouTube Data API v3

---

## ✨ Features

- Authenticate with your Google account
- Input and detect playlist ID from any YouTube playlist URL
- Fetch and display playlist videos in reverse order
- Play selected videos using embedded player
- Responsive UI with Tailwind CSS

---

## 📁 Project Structure

youtube-playlist-reverser/
├── backend/
│ ├── main.py
│ ├── client_secret.json # OAuth credentials
│ └── requirements.txt
├── frontend/
│ ├── index.html
│ ├── postcss.config.js
│ ├── tailwind.config.js
│ ├── package.json
│ └── src/
│ ├── App.tsx
│ ├── main.tsx
│ ├── index.css
│ └── components/
└── README.md

---

## 🔐 Google OAuth Setup (with Test Users)

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**

2. **Create a Project**
   - Click the project dropdown → "New Project"
   - Name it (e.g., `YouTube Playlist Reverser`)

3. **Enable YouTube Data API v3**
   - Navigate to **APIs & Services > Library**
   - Search for **YouTube Data API v3**
   - Click **Enable**

4. **Configure OAuth Consent Screen**
   - Go to **OAuth consent screen**
   - Choose **External**
   - Fill out app name, support email, and developer email
   - Add test user emails under **Test Users**
   - Save and continue

5. **Create OAuth 2.0 Credentials**
   - Go to **APIs & Services > Credentials**
   - Click **Create Credentials > OAuth client ID**
   - Choose **Web application**
   - Under **Authorized redirect URIs**, add:
     ```
     http://localhost:8000/oauth2callback
     ```
   - Click **Create** and download the `client_secret.json` file

6. **Move the Credentials File**
   - Rename it to `client_secret.json`
   - Place it in the `backend/` directory

---

## ▶️ How to Use the App

1. Start the **backend** (FastAPI) and **frontend** (Vite)
2. Open the app in your browser: `http://localhost:5173`
3. Click the **Connect YouTube** button
4. Log in using a **test user** email (configured in Google Cloud)
5. Paste a YouTube playlist URL
6. The app extracts the playlist ID, fetches videos, and displays them in **reverse order**
7. Click on a video to play it in the embedded player

---

## 🔗 Example Playlist URL

https://www.youtube.com/playlist?list=PLABC123XYZ456

The app will automatically extract the `list` ID: `PLABC123XYZ456`

---

## ⚠️ OAuth Notes

- Only **test users** added in the OAuth Consent Screen can log in until the app is verified
- Scope used:  
https://www.googleapis.com/auth/youtube.readonly
- To make the app public, you’ll need to undergo OAuth app verification with Google

---

## 📚 Resources

- [YouTube Data API Docs](https://developers.google.com/youtube/v3)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 📜 License

MIT © 2025 [Aman Kumar]
