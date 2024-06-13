import axios from "axios"

export const getToken = async () => {
    // POSTを第1引数に指定
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
    // 取得内容を確認
    console.log(response.data);
}