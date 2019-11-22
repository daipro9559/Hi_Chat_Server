class IceServer {
    tlsCertPolicy = 'TLS_CERT_POLICY_SECURE'
    constructor(uri, urls, userName, password, hostname) {
        this.uri = uri
        this.urls = urls
        this.username = userName
        this.password = password
        this.hostname = hostname
    }
}

module.exports = IceServer