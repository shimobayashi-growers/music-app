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

    // 適当な関数を作ってtokeの中身を確認
    test() {
        console.log(this.token);
    }
}

const spotify = await SpotifyClient.initialize();
export default spotify;