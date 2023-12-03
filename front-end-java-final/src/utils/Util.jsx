import CryptoJS from 'crypto-js';

class Utils {
    setCookie(name, value) {
        const date = new Date();
        date.setTime(date.getTime() + 8 * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name.trim() + '=' + this.encryptData(value) + '; ' + expires + '; path=/';
    }

    setObjectCookie(name, obj) {
        const serializedObj = JSON.stringify(obj);
        this.setCookie(name, serializedObj);
    }

    getObjectCookie(name) {
        const serializedObj = this.getCookie(name);
        if (serializedObj) {
            return JSON.parse(serializedObj);
        }
        return null;
    }

    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name.trim() + '=')) {
                return this.decryptData(cookie.substring(name.length + 1));
            }
        }
        return null;
    }

    addLoginStorage(member) {
        this.setObjectCookie('lg1', member);
    }

    getDataLogin() {
        return this.getObjectCookie('lg1');
    }

    addRefreshToken(token) {
        this.setCookie('refTk', token);
    }

    addToken(token) {
        this.setCookie('tk', token);
    }

    getToken() {
        return this.getCookie('tk');
    }

    getRefreshToken() {
        return this.getCookie('refTk');
    }

    encryptData(data) {
        return CryptoJS.AES.encrypt(data, '123-login').toString();
    }

    decryptData(encryptedData) {
        return CryptoJS.AES.decrypt(encryptedData, '123-login').toString(CryptoJS.enc.Utf8);
    }
    logOut() {
        this.clearCookie('lg1');
        this.clearCookie('tk');
        this.clearCookie('refTk');
    }

    clearCookie(name) {
        const date = new Date();
        date.setTime(date.getTime() - 1); // Set expiration date to the past
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name.trim() + '=; ' + expires + '; path=/';
    }

    convertTimeStamp(timeSp) {
        const date = new Date(timeSp);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
            .getDate()
            .toString()
            .padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    }

    validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number; adjust as needed
        return phoneRegex.test(phoneNumber);
    };
}

export default new Utils();
