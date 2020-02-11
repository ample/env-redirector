// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context, callback) => {
  try {

    const referer = event.headers.referer
    const conditions = ['localhost', '0.0.0.0', '127.0.0.1', 'int', 'demo', 'development', 'release']
    let dest = "https://pushpay.com/g/crossroads";

    if(referer && conditions.some(el => referer.includes(el))) {
      dest = "https://sandbox.pushpay.io/g/crossroadscincinnati"
    }

    const response = {
      statusCode: 307,
      headers: {
        Location: dest,
      },
      body: JSON.stringify(event)
    };
    return callback(null, response);

  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
