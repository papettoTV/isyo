# Install
```
git clone https://github.com/papettoTV/isyo
```

# Run
set env params

ex)
```
CALLBACK_URL: https://yourdomain/auth/facebook/login
DB_HOST:      <db host>
DB_NAME:      <db name>
DB_PASSWORD:  <db password>
DB_PORT:      <db port>
DB_USER:      <db user>
NODE_ENV:     local
callbackURL:  https://youdomain/auth/facebook/callback
clientID:     <facebook clientID>
clientSecret: <facebook clientSecret>
```

modify cookie/index.js
```
copy cookie_index.js node_modules/cookie/index.js
```
for error 'Error: maxAge should be a Number'

and run
```
node .
```
