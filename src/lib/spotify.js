import axios from "axios"

// class定義をしてtokenを使いやすいようにする
class SpotifyClient {
    static async initialize() {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            {
                // bodyは第2引数に指定
                grant_type: 'client_credentials',
                client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
                client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
            },
            {
                // headerは第3引数に指定
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        // spotify変数にtokenを保存して使いやすいようにする
        let spotify = new SpotifyClient();
        spotify.token = response.data.access_token;
        return spotify;
    }

    // 人気の楽曲をプレイリストから取得
    async getPopularSongs() {
        const response = await axios.get(
            'https://api.spotify.com/v1/playlists/37i9dQZF1DX9vYRBO9gjDe/tracks',
            {
                headers: { Authorization: 'Bearer ' + this.token },
            }
        );
        return response.data;
    }

    // 楽曲の検索
    async searchSongs(keyword) {
        const response = await axios.get(
            'https://api.spotify.com/v1/search',
            {
                headers: { Authorization: 'Bearer ' + this.token },
                params: { q:keyword ,type: 'track'},
            }
        );

        return response.data.tracks;
    }
}

const spotify = await SpotifyClient.initialize();
export default spotify;