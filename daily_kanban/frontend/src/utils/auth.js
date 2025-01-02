export const login = async (username, password) => {
    const response = await fetch('/api-token-auth/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({username, password})
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data.token;
    } else {
        throw new Error('Login failed');
    }
};