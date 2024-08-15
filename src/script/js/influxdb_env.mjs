/** InfluxDB v2 URL */
const url = process.env['INFLUX_URL'] || 'http://localhost:8086'
/** InfluxDB authorization token */
//const token = process.env['INFLUX_TOKEN'] || ''
const token = ''
/** Organization within InfluxDB  */
//const org = process.env['INFLUX_ORG'] || 'research'
const org = ''
/**InfluxDB bucket used in examples  */
const bucket = 'sensors'
// ONLY onboarding example
/**InfluxDB user  */
const username = ''
/**InfluxDB password  */
const password = ''

export {url, token, org, bucket, username, password}
