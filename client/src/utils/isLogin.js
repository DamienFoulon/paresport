import axios from 'axios';

export default async function isLogin(token, email) {
    if (token && email) {
        try {
            const result = await axios.post('https://api.paresport.com/api/auth/verifyToken', {
                token: token,
                email: email
            }).then((res) => {
                return res.status === 200 && res.data.isValid
            })
            return result
        } catch(e) {
            console.log(e)
        }
    }
    return false;
}