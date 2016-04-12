// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1399177093658469', // your App ID
        'clientSecret'    : '5385e08f2bb833a9059a12d69276516d', // your App Secret
        'callbackURL'     : 'http://localhost:5000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : '8CUAHMwbMvocM7gVP8ukwQbZb',
        'consumerSecret'     : 'mACIuSlu7VUpVL71PbvMsY5uyxmvTN2yZAEsaPywQorVW6oJ9K',
        'callbackURL'        : 'http://localhost:5000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '776016968495-6lf7u6og4lnd3g774hdvil8qc1qn4t0k.apps.googleusercontent.com',
        'clientSecret'     : 'h-wnfMBusL_bx_RKXKmYyMZJ',
        'callbackURL'      : 'http://localhost:5000/auth/google/callback'
    }

};
