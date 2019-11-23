class IceServer {
    constructor(uri, urls, userName, password, hostname) {
        this.uri = uri
        this.urls = urls
        this.username = userName
        this.password = password
        this.hostname = hostname
        this.tlsCertPolicy = "TLS_CERT_POLICY_SECURE"

    }
}

module.exports = IceServer