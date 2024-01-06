document.addEventListener("DOMContentLoaded", function() {
    console.info("INFORMATION: Loading of JavaScript file 'login.js' was successful.")
    console.warn(
        '%cWARNING: Pasting any script into this console will give attackers access to your account authentication details. If you know what you are doing you should come working here, details at read.cv/pvcsd',
        'font-weight: bold;'
    );
})

function login_submit() {
    const usernameInput = document.getElementById('login_username');
    const passwordInput = document.getElementById('login_password');
    const loginErrors = document.getElementById('login_errors')

    const userData = {username: usernameInput.value, password: passwordInput.value}; 

    fetch('http://localhost:3000/api/logins/logins.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            loginErrors.textContent = data.message;
        } else {
            loginErrors.textContent = "";
            setCookie("token", data.token);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function signup_submit() {
    const usernameInput = document.getElementById('signup_username');
    const passwordInput = document.getElementById('signup_password');
    const passwordConfirmInput = document.getElementById('signup_repassword');
    const accessInput = document.getElementById('signup_access');
    const signupErrors = document.getElementById('signup_errors')

    const userData = {username: usernameInput.value, password: passwordInput.value, password_confirm: passwordConfirmInput.value, accesskey: accessInput.value};

    fetch('localhost:3000/api/logins/signups.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            signupErrors.textContent = data.message;
        } else {
            signupErrors.textContent = "";
            setCookie("token", data.token);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// This code does not look professional. It looks like a cat fell asleep on the keyboard. But it works so it won't be fixed. Or at least not by me ¯\_(ツ)_/¯

function setCookie(cname, cvalue) {
    let d = new Date();
    d.setTime(d.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; expires=" + expires + "; path=/; SameSite=None; Secure";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}