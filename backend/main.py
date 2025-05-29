from fastapi import FastAPI, Request # type: ignore
from fastapi.responses import RedirectResponse # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from google_auth_oauthlib.flow import Flow # type: ignore
from googleapiclient.discovery import build # type: ignore
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store your OAuth secret file path
CLIENT_SECRETS_FILE = "client_secret.json"
SCOPES = ['https://www.googleapis.com/auth/youtube']

global credentials
# Initialize credentials variable
credentials = None

@app.get("/auth-url")
def get_auth_url():
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri="http://localhost:8000/oauth2callback"
    )
    auth_url, _ = flow.authorization_url(prompt='consent')
    return {"auth_url": auth_url}

@app.get("/oauth2callback")
def oauth_callback(request: Request):
    code = request.query_params['code']
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri="http://localhost:8000/oauth2callback"
    )
    flow.fetch_token(code=code)
    # Save credentials to session or database if needed
    global credentials
    credentials = flow.credentials

    # After successful login, redirect to frontend homepage
    return RedirectResponse("http://localhost:5173/")

@app.get("/playlist/{playlist_id}")
def get_reversed_playlist(playlist_id: str):
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri="http://localhost:8000/oauth2callback"
    )
    # Ideally: Load credentials from session or token store
    global credentials
    youtube = build('youtube', 'v3', credentials=credentials)

    items = []
    request = youtube.playlistItems().list(
        part='snippet',
        playlistId=playlist_id,
        maxResults=50
    )

    while request:
        response = request.execute()
        items.extend(response['items'])
        request = youtube.playlistItems().list_next(request, response)

    video_ids = [item['snippet']['resourceId']['videoId'] for item in reversed(items)]
    return {"video_ids": video_ids}
