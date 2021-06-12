const fetch = require('node-fetch')

const handler = async function () {
  try {
    const response = await fetch('http://api.interview.staging.foodieorders.com/v3/orders/search', {
      headers: { Accept: 'application/json' },
      method: 'POST',
      body: JSON.stringify({})
    })
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      headers: {
        "content-type": 'application/json',
      },
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
