#!/bin/sh

cat <<EOF > /usr/share/nginx/html/config.json
{
  "VITE_API_URL": "${VITE_API_URL}",
  "VITE_API_USER": "${VITE_API_USER}",
  "VITE_API_PASS": "${VITE_API_PASS}",
  "VITE_API_NAME": "${VITE_API_NAME}"
}
EOF

exec nginx -g 'daemon off;'
