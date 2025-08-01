openssl req \
    -newkey rsa:2048 \
    -nodes \
    -x509 \
    -days 36500 -nodes \
    -addext "subjectAltName = IP.1:10.4.200.48" \
    -keyout certs/ucu.key \
    -out certs/ucu.crt